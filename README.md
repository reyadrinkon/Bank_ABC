## BankABC

## Prerequisites: (Git, Curl, Docker, Docker-compose)

### Installing Git and Curl

```bash
sudo apt install -y git curl
```

### Installing Node.JS

```bash
#install nvm (node version manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

source ~/.bashrc

#install node
nvm install 11
nvm use 11
nvm alias default 11
```


### Installing Docker

- [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

### Activate Docker Group (Executing the Docker Command Without Sudo)

By default, the docker command can only be run the **root** user or by a user in the docker group, which is automatically created during Docker's installation process. If you attempt to run the `docker` command without prefixing it with `sudo` or without being in the **docker** group, you'll get an output like this:

> docker: Cannot connect to the Docker daemon. Is the docker daemon running on this host?.
See 'docker run --help'.

If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group:

```bash
sudo usermod -aG docker ${USER}

su - ${USER}
```

Confirm that your user is now added to the docker group by typing:

```bash
id -nG
```
If everything went well, you'll see **docker** in the output

### Installing Docker Compose

- [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/
)

### Installing Hyperledger Fabric:

```bash
cd $HOME
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s
```

### Setting Up Environment Variables:

```bash
echo export PATH=\$PATH:\$HOME/fabric-samples/bin | tee -a ~/.bashrc

echo export FABRIC_CFG_PATH=$HOME/fabric-samples/config | tee -a ~/.bashrc

source ~/.bashrc
```

### Downloading BankABC
```bash
cd $HOME/fabric-samples

git clone https://github.com/rinkon005/Bank_ABC bankabc

cd $HOME/fabric-samples/bankabc/chaincode-javascript
npm install

cd $HOME/fabric-samples/bankabc/api-javascript
npm install
```

## Starting Blockchain Test Network and Install BankABC Chaincode

```bash
cd $HOME/fabric-samples/test-network

# Start Test Network
./network.sh down && ./network.sh createChannel -ca -c mychannel -s couchdb

# Deleting the existing wallet from previous test network
rm -rf $HOME/fabric-samples/bankabc/api-javascript/wallet

# Install Chaincode
./network.sh deployCC -ccn p22 -ccp $HOME/fabric-samples/t-drive/chaincode-javascript/ -ccl javascript
```

## Starting BankABC API

```bash
cd $HOME/fabric-samples/bankabc/api-javascript

npm install

node app.js
```

You can test the API with the **REST CLIENT** vs code extension. The tests are written in the file **api_test.rest**.

## Viewing Blockchain State in CouchDB

You can view the current state at [http://localhost:5984/_utils/](http://localhost:5984/_utils/).

**Username:** admin  
**Password:** adminpw

## Stopping Test Network

```bash
cd $HOME/fabric-samples/test-network

./network.sh down
```
