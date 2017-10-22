#!/bin/bash
git remote add heroku https://git.heroku.com/prello-auth.git
git config --global user.email "porquepix@hotmail.fr"
git config --global user.name "Alexis Andrieu"

wget https://cli-assets.heroku.com/branches/stable/heroku-linux-amd64.tar.gz
sudo mkdir -p /usr/local/lib /usr/local/bin
sudo tar -xvzf heroku-linux-amd64.tar.gz -C /usr/local/lib
sudo ln -s /usr/local/lib/heroku/bin/heroku /usr/local/bin/heroku

cat > ~/.netrc << STOP
machine api.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_API_KEY
machine git.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_API_KEY
STOP

# Add heroku.com to the list of known hosts
mkdir -p ~/.ssh
ssh-keyscan -H heroku.com >> ~/.ssh/known_hosts
