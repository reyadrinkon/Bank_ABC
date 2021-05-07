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
const chaincodeName = 'p11';
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
			await contract.submitTransaction('InitLedger');



			
			try {
				let result =await contract.evaluateTransaction('CreateUser', '100', 'abul@gmail', 'abul123','abul');
				
				await contract.submitTransaction('CreateUser', '100', 'abul@gmail', 'abul123','abul');
				console.log(`Create User successfull \n result: ${result}`);

			} catch (error) {
				console.log(`*** Error: \n    ${error}`);
			}

			try {
				

				
				let result =await contract.evaluateTransaction('CreateUser', '200', 'babul@gmail', 'babul123','babul');
				await contract.submitTransaction('CreateUser', '200', 'babul@gmail', 'babul123','babul');
				console.log(`User created \n result: ${result}`);

			} catch (error) {
				console.log(`*** Error: \n    ${error}`);
			}

			try {
				

				
				let result =await contract.evaluateTransaction('DepositMoney', '200', 500);
				await contract.submitTransaction('DepositMoney', '200', 500);
				console.log(`Deposit successfull \n result: ${result}`);

			} catch (error) {
				console.log(`*** Error: \n    ${error}`);
			}

			try {
				

				
				let result =await contract.evaluateTransaction('DepositMoney', '200', 1500);
				await contract.submitTransaction('DepositMoney', '200', 1500);
				console.log(`Deposit successfull \n result: ${result}`);

			} catch (error) {
				console.log(`*** Error: \n    ${error}`);
			}
			try {
							
				let result =await contract.evaluateTransaction('WithDrawMoney', '200','babul123', 50);
				await contract.submitTransaction('WithDrawMoney', '200','babul123', 50);
				console.log(`withdrawl successfull \n result: ${result}`);

			} catch (error) {
				console.log(`*** Error: \n    ${error}`);
			}

			try {
							
				let result =await contract.evaluateTransaction('SendMoney', '200','100','babul123', 55);
				await contract.submitTransaction('SendMoney', '200','100','babul123', 55);
				console.log(`withdrawl successfull \n result: ${result}`);

			} catch (error) {
				console.log(`*** Error: \n    ${error}`);
			}




			
		} finally {
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

main();
