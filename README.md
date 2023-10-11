# prism-next

A demonstration of best practices for developing applications with pubsweet.

## Background

### PubSweet

PubSweet is a free, open-source framework for building publishing platforms. It consists of an Express server and React client that work together, and both can be modified and extended with components to add functionality to the system. PubSweet is used for book publishing, academic journal production, and micropublication platforms by many established academic organizations, including the University of California Press, eLife, Hindawi, California Digital Library, and others.

#### Projects Using Pubsweet

- [Editoria](https://gitlab.coko.foundation/editoria/editoria) - a book production platform built for University of California Press
- [elife-xpub](https://github.com/elifesciences/elife-xpub/) - A journal publishing platform in collaboration with eLife
- [xpub-review](https://gitlab.com/hindawi/xpub/xpub-review) - A journal publishing platform in collaboration with Hindawi
- [Micropubs](https://gitlab.coko.foundation/micropubs/wormbase) - A micropublications platform in collaboration with Wormbase
- [Xpub](https://gitlab.coko.foundation/xpub/xpub) - Collabra, a journal publishing platform
- [Kotahi](https://gitlab.coko.foundation/kotahi/kotahi) - Document submission, review and publishing system

### Coko Client/Server

The original PubSweet framework was developed five years ago, and it is no longer actively maintained. This project is now actively developed and maintained under [Coko Client](https://gitlab.coko.foundation/cokoapps/client) and [Coko Server](https://gitlab.coko.foundation/cokoapps/server), collectively called the PubSweet FrameWork.

These projects are still under active development and depend on large portions of the original framework. Consequently, the current published documentation and starter projects are outdated. One must often refer to the source code to derive intended usage.

### Kotahi

Kotahi is a scholarly publishing platform based on PubSweet. It supports multiple customizable end-to-end workflows for journals, preprint, PRC, conference proceedings, submissions, reviews, communication, and publication. A complete list of features can be found on the [Kotahi homepage](https://kotahi.community/features/). Kotahi is still under active development and is primarily developed for and used by [eLife](https://elifesciences.org/), "an independent nonprofit committed to improving the way research is reviewed and communicated."

A sandbox Kotahi environment is up and running at <http://146-190-44-217.nip.io:4000/>. When signing in or registering, you will be prompted to select an ORCID sandbox user. If you do not have one already, you can create one during the registration flow, but ORCID will only send mail to a mailinator.com address in their sandbox environment. Click [here](https://www.mailinator.com/v4/public/inboxes.jsp?to=kotahi-aps-dev) to reserve kotahi-aps-dev@mailinator.com if needed.

## Features

TODO
