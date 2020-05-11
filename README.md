# deltachat-desktop

**Desktop Application for [delta.chat](https://delta.chat)**

<center><img src="README_ASSETS/screenshot.png"/></center>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm test](https://github.com/deltachat/deltachat-desktop/workflows/npm%20test/badge.svg)](https://github.com/deltachat/deltachat-desktop/actions?query=workflow%3A%22npm+test%22+branch%3Amaster)
[![Build Status](https://travis-ci.org/deltachat/deltachat-desktop.svg?branch=master)](https://travis-ci.org/deltachat/deltachat-desktop)

**If you are upgrading:** please see [`UPGRADING.md`](UPGRADING.md).

## Table of Contents

> TODO: update this toc to conatin all points

<details><summary>Click to expand</summary>

- [Install](#install)
- [Configuration and Databases](#configuration-and-databases)
- [Troubleshooting](#troubleshooting)
- [How to Contribute](#how-to-contribute)
- [License](#license)

</details>

## Install

The application can be downloaded from the [`Releases`](https://github.com/deltachat/deltachat-desktop/releases) page. Here you'll find prebuilt releases for all supported platforms. See below for platform specific instructions. If you run into any problems please consult the [Troubleshooting](#troubleshooting) section below.

### Linux

#### Flatpak

The primary distribution-independed way to install is to use the
flatpak build. This is maintained in [it's own
repository](https://github.com/flathub/chat.delta.desktop), however a
pre-built binary can be downloaded and installed from
[flathub](https://flathub.org/apps/details/chat.delta.desktop) which
also has a setup guide for many Linux platforms.

#### Arch Linux

> **WARNING: Currently the AUR package compiles from latest master. This can be more recent as the latest release, introduce new features but also new bugs.**

If you have a AUR helper like yay installed, you can install it by running `yay -S deltachat-desktop-git` and following the instruction in your terminal.

Otherwise you can still do it manually:

```
# Download the latest snapshot of the PKGBUILD
wget https://aur.archlinux.org/cgit/aur.git/snapshot/deltachat-desktop-git.tar.gz
# extract the archive and rm the archive file afterwards
tar xzfv deltachat-desktop-git.tar.gz && rm deltachat-desktop-git.tar.gz
# cd into extracted folder
cd deltachat-desktop-git
# build package
makepkg -si
# install package (you need to replace <version> with whatever version makepkg built)
sudo pacman -U deltachat-desktop-git-<version>.tar.xz
```

### Mac OS

Simply install the `.dmg` file as you do it with all other software on mac.

If you are getting an openssl error message at the first start up you need to install openssl.

```
$ brew install openssl
```

### From Source

> ⚠ Information on this section might be deprecated. [TODO update this section]
> Get the code:

```
$ git clone https://github.com/deltachat/deltachat-desktop.git
$ cd deltachat-desktop
```

Install dependencies, there are two options:

1. Use system-wide installed `libdeltachat.so`:

```
$ npm install --dc-system-lib=true
```

2. Use the deltachat-core-rust code included as a git submodule in the
   deltachat-node bindings:

```
$ npm install
```

For both these see the instructions in the deltchat-node and
deltachat-rust-core README files to set things up.

Build the app (only needed if the code has changed or if the app has
never been built before):

```
$ npm run build
```

Start the application:

```
$ npm start
```

## Configuration and Databases

The configuration files and database are stored at [application-config's default filepaths](https://www.npmjs.com/package/application-config#config-location).

Each database is a sqlite file that represents the account for a given email address.

## Troubleshooting

This module builds on top of `deltachat-core-rust`, which in turn has external dependencies. Instructions below assumes a Linux system (e.g. Ubuntu 18.10).

If you get errors when running `npm install`, they might be related to the _build_ dependency `rust`.

If `rust` or `cargo` is missing:
Follow the instruction on <https://rustup.rs/> to install rust and cargo.

Then try running `npm install` again.

## How to Contribute

Read [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)

## Logging

You can access the log folder and the current log file under the `View->Developer` menu:

<center><img src="README_ASSETS/devMenu.png"/></center>

Read [docs/LOGGING.md](docs/LOGGING.md) for an explaination about our logging system. (availible **options**, log **location** and information abour the used Log-**Format**)

## License

Licensed under `GPL-3.0-or-later`, see [LICENSE](./LICENSE) file for details.

> Copyright © 2019 `DeltaChat` contributors.

> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU General Public License as published by
> the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.

> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
> GNU General Public License for more details.

> You should have received a copy of the GNU General Public License
> along with this program. If not, see <http://www.gnu.org/licenses/>.
