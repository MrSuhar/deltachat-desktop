const React = require('react')

const ChatList = require('./ChatList')
const ChatView = require('./ChatView')

const {
  Alignment,
  Classes,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Position,
  Menu,
  MenuItem,
  Popover,
  Button
} = require('@blueprintjs/core')

class SplittedChatListAndView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedChat: {}
    }

    this.onChatClick = this.onChatClick.bind(this)
  }

  onChatClick (chat) {
    console.log('xx', chat)
    this.setState({ selectedChat: chat })
  }

  render () {
    const { deltachat } = this.props
    const { selectedChat } = this.state
    const tx = window.translate

    const menu = (<Menu>
      <MenuItem icon='plus' text={tx('addContact')} onClick={this.onCreateContact} />
      <MenuItem icon='plus' text={tx('addChat')} onClick={this.onCreateChat} />
      <MenuItem icon='plus' text={tx('createGroup')} onClick={this.onCreateGroup} />
      <MenuItem icon='exchange' text={tx('initiateKeyTransferTitle')} onClick={this.initiateKeyTransfer} />
    </Menu>)

    return (
      <div>
        <div className="Navbar">
          <Navbar fixedToTop>
            <NavbarGroup align={Alignment.LEFT}>
              <Button className={Classes.MINIMAL} icon='log-out' onClick={this.logout} text={tx('logout')} />
              <NavbarHeading>{deltachat.credentials.email}</NavbarHeading>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
              <img src={selectedChat ? selectedChat.profileImage : null} />
              <NavbarHeading>{selectedChat ? selectedChat.name : 'No chat selected'}</NavbarHeading>
              <div>{selectedChat ? selectedChat.subtitle : ''}</div>
              <Popover content={menu} position={Position.RIGHT_TOP}>
                <Button className={Classes.MINIMAL} icon='menu' />
              </Popover>
            </NavbarGroup>
          </Navbar>
        </div>

        <ChatList
          screenProps={this.props.screenProps}
          userFeedback={this.props.userFeedback}
          changeScreen={this.props.changeScreen}
          deltachat={this.props.deltachat}
          onChatClick={this.onChatClick}/>
        <ChatView
          screenProps={this.props.screenProps}
          userFeedback={this.props.userFeedback}
          changeScreen={this.props.changeScreen}
          chatId={selectedChat.id}
          deltachat={this.props.deltachat}/>

      </div>
    )
  }
}

module.exports = SplittedChatListAndView
