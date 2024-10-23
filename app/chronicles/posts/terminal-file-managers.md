---
title: Terminal-based file manager
description: File managers for nerds
image: posts/lf_terminal-file-managers
pubDate: 2024-06-16
---

There are many practical use cases for a terminal-based file manager.
Personally, I find them particularly useful for those who prefer staying
within the terminal and avoid the need to open a GUI application just to
browse files or view a directory tree.

When I first started using Arch Linux, URXVT (rxvt-unicode) was the go-to
terminal emulator, and many users customized their setups with pywal to
synchronize colors across applications. At that time, Ranger was the most
popular file manager.

Although pywal has since been archived and URXVT has largely fallen out of
use, several new terminal-based file managers have emerged that I'd like
to discuss.

## lf

The main reason for choosing lf over other tools is its simplicity.
It comes with Vim keybindings by default and allows users to extend its
functionality through custom scripts.

### Configuration

`lf` searches for the configuration file in the user's config directory at
`$XDG_CONFIG_DIRS/lf/lfrc`. However, you can specify a different location
using the `-config` flag.

```sh
# ~/.config/lf/lfrc

set shell fish
set shellopts '-eu'

# leave some space at the top and the bottom of the screen
set scrolloff 10

# make sure trash folder exists
%mkdir -p ~/.local/share/Trash/files

# move current file or selected files to trash folder
cmd trash %set -f; mv $fx ~/.local/share/Trash/files

# compress current file or selected files with zip
cmd zip ${{
    set -f
    mkdir $1
    cp -r $fx $1
    zip -r $1.zip $1
    rm -rf $1
}}
```

The example file can be found in `/usr/share/doc/lf/lfrc.example` or the GitHub
[repository](https://github.com/gokcehan/lf/blob/master/etc/lfrc.example).

### File Preview

To write the previewer script, ensure you understand the five arguments
passed to it:

1. File: $1 (file path)
2. Width: $2 (previewer's width)
3. Height: $3 (previewer's height)
4. Left: $4 (margion of the previewer from left)
5. Top: $5 (margion of the previewer from top)

Additionally, you can run LF with the `-debug` flag to generate a log file
for troubleshooting:

```bash
lf -log /tmp/lf_log
```

Some files will require a thumbnail You may want to take a look at the
[freedesktop specification](https://specifications.freedesktop.org/thumbnail-spec/latest/)

For images and cover my recommendation is to use the
[kitty graphics protocol](https://sw.kovidgoyal.net/kitty/graphics-protocol/).

```fish
#!/usr/bin/env fish

set thumbnail (printf "$XDG_CACHE_HOME/thumbnails/large/%s.png" (echo -n "file://$argv[1]"| md5sum| awk '{print $1}'))

mkdir -p $XDG_CACHE_HOME/thumbnails/large/

function preview_image
    kitty +kitten icat --stdin no --transfer-mode file --place \
        {$argv[2]}x{$argv[3]}@{$argv[4]}x{$argv[5]} $argv[1] >/dev/tty
    exit 1
end


switch (file --dereference --brief --mime-type $argv[1])
    case "application/x-tar"
        tar tf $argv[1]

    case "application/zip"
        unzip -l $argv[1]

    case "audio/flac"
        if test ! -f $thumbnail; metaflac --export-picture-to=$thumbnail $argv[1]; end
        preview_image $thumbnail $argv[2] $argv[3] $argv[4] $argv[5]

    case "video/*"
        if test ! -f $thumbnail; ffmpeg -i $argv[1] -vframes 1 $thumbnail; end
        preview_image $thumbnail $argv[2] $argv[3] $argv[4] $argv[5]

    case "image/*"
        preview_image $argv

    case "*"
        bat -p -f $argv[1]
end
```

## Yazi

This is the one with the most information by far, Yazi has a
[documentation](https://yazi-rs.github.io/docs/quick-start), and some
plugins that can help to understand how to write your own.

To install a `Flavor` which is a pre-made theme, yazi comes with a
package manager.

Installing catppuccin-mocha.yazi

```sh
ya pack -a yazi-rs/flavors:catppuccin-mocha
```

```toml
# ~/.config/yazi/theme.toml

[flavor]
use = "catppuccin-mocha"
```

You can also clone the directory using Git, but the package manager is
capable of updating all plugins and flavors at once.

```sh
ya pack -u
```

In your dotfiles, make sure to back up the `packages.toml` file.

Yazi can preview most common file types, but for others, you'll need to
install a plugin. This process is a bit more challenging compared to lf
because Yazi uses Lua instead of shell scripts. However, there are already
many plugins you can install.

## Conclusion

I find Yazi more enjoyable and faster to use than lf, although there are a
few considerations to keep in mind.

Since Yazi is designed to implement multiple protocols, you can't take full
advantage of Kitty's features. Additionally, Yazi generates optimized
versions of images at lower quality to help with performance, but this
doesn't mean that implementing similar optimizations in lf would be slow;
the quality loss is noticeable.

Currently, the version in Nixpkgs does not support alpha channels for
PNGs, and I'm unsure if animation support will ever be implemented.

On the bright side, Yazi is under active development, and if you run the
latest commit, the PNG images caching has been fixed:

```sh
nix registry add yazi github:sxyazi/yazi
nix profile install yazi
```

For now, I prefer using Yazi as it works better in tmux than lf.