import React, { useContext, useState, useRef } from 'react'
import DeltaDialog, {
  DeltaDialogBody,
  DeltaDialogContent,
  DeltaDialogFooter,
} from './DeltaDialog'
import { ScreenContext } from '../../contexts'
import { Icon } from '@blueprintjs/core'
import { LocalSettings } from '../../../shared/shared-types'
import { callDcMethodAsync } from '../../ipc'
import { selectChat } from '../../stores/chat'
import QrReader from 'react-qr-reader'

interface QrStates {
  [key: number]: string;
}const tx = window.translate

const qrStates: QrStates = {
  200: 'QrAskVerifyContact', // id = contact
  202: 'QrAskVerifyGroup', // text1=groupname
  210: 'QrFprOk', // finger print ok for id=contact
  220: 'QrFprMissmatch', // finger print not ok for id=contact
  230: 'QrFprWithoutAddr', 
  250: 'QrAccount', // text1=domain
  320: 'QrAddr', // id=contact
  330: 'QrText', // text1=text
  332: 'QrUrl', // text1=URL
  400: 'QrError' // text1=error string
}

declare type QrCodeResponse = {
  state: keyof QrStates;
  id: number;
  text1: string;
}

export function DeltaDialogImportQrInner({
  description, onClose
}: {
  description: string,
  onClose: () => void
}) {
  const tx = window.translate
  const [ qrCode, setQrCode ] = useState('')
  const [ useCamera, setUseCamera ] = useState(false)
  const screenContext = useContext(ScreenContext)

  const handleResponse = async(txt: string) =>
  {
    setQrCode(txt)
    const tx = window.translate
    let error = false
    const response: QrCodeResponse = await callDcMethodAsync('checkQrCode', txt)
    if (response === null) {
      error = true
    }
    const state = qrStates[response.state]
    if (error || state === 'QrError' || state === 'QrText') {
      screenContext.userFeedback({
        type: 'error',
        text: tx('import_qr_error'),
      });
      return;
    }
    if (state === 'QrAskVerifyContact') {
      const contact = await callDcMethodAsync('contacts.getContact', response.id);
      screenContext.openDialog('ConfirmationDialog', {
        message: tx('ask_start_chat_with', contact.address),
        confirmLabel: tx('ok'),
        cb: async (confirmed: boolean) => {
          if (confirmed) {
            const chatId = await callDcMethodAsync('contacts.createChatByContactId', response.id)
            selectChat(chatId)
            onClose()
          }
        }
      })
    } else if ( state === 'QrAskVerifyGroup') {
      screenContext.openDialog('ConfirmationDialog', {
        message: tx('qrscan_ask_join_group', response.text1),
        confirmLabel: tx('ok'),
        cb: async (confirmed: boolean) => {
          if (confirmed) {
            const chatId = await callDcMethodAsync('chat.createGroupChat', [false, response.text1])
            selectChat(chatId)
            onClose()
          }
        }
      })
    }
  }

  const qrImageReader = useRef<any>()

  const handleScan = (data: string) => {
    if (data) {
      handleResponse(data)
    }
  }

  const onImageLoad = (img: ImageBitmap) => {
    console.log(img)
  }

  const handleError = (err: string) => {
    console.error(err)
  }

  const toggleCamera = () => {
    setUseCamera(!useCamera)
  }

  const openImageDialog = () => {
    qrImageReader.current.openImageDialog()
  }

  return (
    <>
      <DeltaDialogBody>
        <DeltaDialogContent noOverflow noPadding>
          <div className='import-qr-code-dialog'>
            <div className='qr-data'>
              <div className='content' aria-label={tx('a11y_qr_data')}>
                {qrCode}
              </div>
              <div
                title={tx('paste_from_clipboard')}
                className='copy-btn'
                role='button'
                onClick={() => {
                  navigator.clipboard.readText().then(handleResponse)
                }}
              >
                <Icon icon='clipboard' />
              </div>
            </div>
            <button onClick={openImageDialog} className={'bp3-button'}>
            {tx('load_qr_code_as_image')}
            </button>
            {!useCamera && 
            <button
              aria-label={tx('scan_with_camera')}
              onClick={toggleCamera}
              className={'bp3-button'}
            >{tx('scan_with_camera')}</button>}
            {useCamera && 
            <div>
              <button
              aria-label={tx('cancel_camera')}
              onClick={toggleCamera}
              className={'bp3-button'}
              >{tx('cancel_camera')}</button> 
              <div>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
                
              </div>
            </div>}
            <div className='qr-image-loader'>
              <QrReader
                delay={300}
                ref={qrImageReader}
                onError={handleError}
                onScan={handleScan}
                onImageLoad={onImageLoad}
                style={{ width: '100%' }}
                legacyMode
              />
            </div>
          </div>
        </DeltaDialogContent>
      </DeltaDialogBody>
      <DeltaDialogFooter>
      </DeltaDialogFooter>
    </>
  )
}

export default function ImportQrCode({
  onClose,
  isOpen,
  deltachat,
}: {
  onClose: () => void
  isOpen: boolean
  qrCode: string
  deltachat: LocalSettings
}) {
  const tx = window.translate
  const Dialog = DeltaDialog as any // todo remove this cheat.
  return (
    <Dialog
      title={tx('import_qr_title')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <DeltaDialogImportQrInner
        description=''
        onClose={onClose}
      />
    </Dialog>
  )
}
