/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'bbbba';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}



async function main() {
	try {
		const ccp = buildCCPOrg1();

		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		const wallet = await buildWallet(Wallets, walletPath);

		await enrollAdmin(caClient, wallet, mspOrg1);

		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		const gateway = new Gateway();

		try {
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			const network = await gateway.getNetwork(channelName);

			const contract = network.getContract(chaincodeName);







			//-------------------------------------------------
			let express= require('express');
            //let app=express();
			var cors= require('cors');
			let app=express()


			const PORT =3000;
			app.use(express.urlencoded({extended: false}))
			app.use(express.json())
			//app.use(cors())
			app.use(cors({
				origin: "http://localhost:3001",
				credentials: true
			}));


            app.get('/',function(req,res)
            {
            res.send('Hello World!');
            });

			app.get('/book',function(req,res)
            {
            res.send('Hello Book readers!');
            });
			app.post('/register',async function(req, res){
				const {key, email ,password ,name }=req.body;

			try {
				let result =await contract.evaluateTransaction('CreateUser', key, email, password,name );

				await contract.submitTransaction('CreateUser', key, email, password,name );
				res.send(result.toString());

			} catch (error) {
				//console.log(`*** Error: \n    ${error}`);
				res.send(error.toString());
			}

			});
			app.post('/depositmoney',async function(req, res){
				const {key, amount }=req.body;

			try {
				let result =await contract.evaluateTransaction('DepositMoney', key, amount );

				await contract.submitTransaction('DepositMoney', key, amount );
				res.send(result.toString());

			} catch (error) {
				res.send(error.toString());
			}

			});

			app.post('/withdrawmoney',async function(req, res){
				const {key, password, amount }=req.body;

			try {
				let result =await contract.evaluateTransaction('WithDrawMoney', key,password ,amount );

				await contract.submitTransaction('WithDrawMoney', key,password ,amount );
				res.send(result.toString());

			} catch (error) {
				res.send(error.toString());
			}

			});
			app.post('/sendmoney',async function(req, res){
				const {from_key,to_key,from_password,amount }=req.body;

			try {
				let result =await contract.evaluateTransaction('SendMoney', from_key,to_key,from_password ,amount );

				await contract.submitTransaction('SendMoney', from_key,to_key,from_password,amount );
				res.send(result.toString());

			} catch (error) {
				res.error(error.toString());
			}

			});

			app.post('/checkbalance',async function(req, res){
				const {key, password }=req.body;

			try {
				let result =await contract.evaluateTransaction('CheckBalance', key, password );

				await contract.submitTransaction('CheckBalance', key, password );
				res.send(result.toString());

			} catch (error) {
				res.error(error.toString());
			}

			});



			// app.post('/register', async function (req, res) {
			// 	const {key, email, password, name } = req.body;

			// 	try {
			// 		let result = await contract.evaluateTransaction('CreateUser', key, email, password, name);
			// 		await contract.submitTransaction('CreateUser', key, email, password, name);

			// 		res.send(result.toString());
			// 	} catch (error) {
			// 		res.status(400).send(error.toString());
			// 	}
			// })
			// app.post('/register', async function (req, res) {
			// 	const { email, password, name } = req.body;
			// 	const key = `user_${email}`;

			// 	try {
			// 		let result = await contract.evaluateTransaction('CreateUser', key, email, password, name);
			// 		await contract.submitTransaction('CreateUser', key, email, password, name);

			// 		res.send(result.toString());
			// 	} catch (error) {
			// 		res.status(400).send(error.toString());
			// 	}
			// })


			// app.post('/depositmoney', async function (req, res) {
			// 	const { key, amount} = req.body;

			// 	try {
			// 		let result = await contract.evaluateTransaction('DepositMoney', key, amount);
			// 		await contract.submitTransaction('DepositMoney', key, amount);

			// 		res.send(result.toString());
			// 	} catch (error) {
			// 		res.status(400).send(error.toString());
			// 	}
			// })

			// app.post('/withdrawmoney', async function (req, res) {
			// 	const { key,password, amount} = req.body;

			// 	try {
			// 		let result = await contract.evaluateTransaction('WithDrawMoney', key,password, amount);
			// 		await contract.submitTransaction('WithDrawMoney', key,password, amount);

			// 		res.send(result.toString());
			// 	} catch (error) {
			// 		res.status(400).send(error.toString());
			// 	}
			// })

			// app.post('/sendmoney', async function (req, res) {
			// 	const { key,password, amount} = req.body;

			// 	try {
			// 		let result = await contract.evaluateTransaction('SendMoney', from_id,to_id,from_password, amount);
			// 		await contract.submitTransaction('SendMoney', from_id,to_id,from_password, amount);

			// 		res.send(result.toString());
			// 	} catch (error) {
			// 		res.status(400).send(error.toString());
			// 	}
			// })






            var server=app.listen(3000,function()
			{
				console.log(`Server listining in port :${PORT}`)
			});



		} finally {
			// gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

main();
