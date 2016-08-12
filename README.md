# magic-mirror-dashboard
Dashboard for "Magic Mirror" project. Displays weather, transit, news and other info.

## Setup

1. install node & npm
2. install ruby
3. sudo npm install -g grunt
4. gem install bundler
5. npm install
6. bundle install
7. `grunt build`
8. `node index.js`


**./config/keys.json**

```
{
    "one_bus_away": {
        "secret": "SECRET CODES"
    }
}
```

# Raspberry Pi Setup

### Disabling the Screensaver

Comment out `@xscreensaver -no-splash` line of `/home/pi/.config/lxsession/LXDE-pi/autostart`, and add the following lines.

```
@xset s off
@xset s noblank
@xset -dpms
```

### Setting up Chrome in Kiosk Mode

Chromium is the only browser that truly works in fullscreen mode without too much hackiness.

Unfortunately it's not in Raspbian's default repos so you'll need to `wget` the `.deb` files and install them yourself using `sudo dpkg -i <package-name>`.

- [libgcrypt11](https://launchpad.net/ubuntu/trusty/armhf/libgcrypt11/)
- [Chromium Codecs](https://launchpad.net/ubuntu/trusty/armhf/chromium-codecs-ffmpeg-extra)
- [Chromium Browser](https://launchpad.net/ubuntu/trusty/armhf/chromium-browser)


To start the browser on startup in fullscreen mode, add the following line to `/home/pi/.config/lxsession/LXDE-pi/autostart`.

```
@chromium-browser --noerrdialogs --kiosk --incognito https://google.com
```

### Hiding the Mouse

Install unclutter `sudo apt-get install unclutter` and add the following line to `/home/pi/.config/lxsession/LXDE-pi/autostart`.

```
@unclutter -idle 0.1 -root' into /etc/xdg/lxsession/LXDE/autostart
```
