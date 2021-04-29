

/*
 SPDX-License-Identifier: Apache-2.0
*/

// ====CHAINCODE EXECUTION SAMPLES (CLI) ==================


'use strict';

const {Contract} = require('fabric-contract-api');

class Bankabc extends Contract {
    //-------------------------------------------------------------------------------

    async CreateUser(ctx, key, email, password, name) {
        let balance=0;
        const user  = {
            Key: key,
            Email: email,
            Password: password,
            Name: name,
            Balance: balance,
            Doctype:'user'
        };
        ctx.stub.putState(key, Buffer.from(JSON.stringify(user)));
        return JSON.stringify(user);
    }
    //------------------------------------------------------------------------------


   

    async DepositMoney(ctx, key, amount) {

        let assetAsBytes = await ctx.stub.getState(key);
        if (!assetAsBytes || !assetAsBytes.toString()) {
            throw new Error(`Account with key: ${key} does not exist`);
        }
        let assetToTransfer = {};
        try {
            assetToTransfer = JSON.parse(assetAsBytes.toString()); //unmarshal
        } catch (err) {
            let jsonResp = {};
            jsonResp.error = 'Failed to decode JSON of: ' + key;
            throw new Error(jsonResp);
        }
        assetToTransfer.Balance = parseInt(assetToTransfer.Balance)+parseInt(amount);

        let assetJSONasBytes = Buffer.from(JSON.stringify(assetToTransfer));
        await ctx.stub.putState(key, assetJSONasBytes); //rewrite the asset
    }
 
    async WithDrawMoney(ctx, key,password, amount) {

        let assetAsBytes = await ctx.stub.getState(key);
        if (!assetAsBytes || !assetAsBytes.toString()) {
            throw new Error(`Account ${key} does not exist`);
        }

        let assetToTransfer = {};
        try {
            assetToTransfer = JSON.parse(assetAsBytes.toString()); //unmarshal
        } catch (err) {
            let jsonResp = {};
            jsonResp.error = 'Failed to decode JSON of: ' + key;
            throw new Error(jsonResp);
        }
        if(assetToTransfer.Password !== password){
            throw new  Error (`This password with key: ${key} doesnt match`) ;
        }
        if(parseInt(assetToTransfer.Balance)< parseInt(amount)){
            throw new  Error (`You Dont have taka : ${amount} `) ;
        }
        assetToTransfer.Balance = parseInt(assetToTransfer.Balance)-parseInt(amount);

        let assetJSONasBytes = Buffer.from(JSON.stringify(assetToTransfer));
        await ctx.stub.putState(key, assetJSONasBytes); //rewrite the asset
    }

    async SendMoney(ctx,from_id,to_id,from_password,amount){

        await this.WithDrawMoney(ctx, from_id,from_password,amount);
        await this.DepositMoney(ctx, to_id,amount);
    }


    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from TDrive state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`Asset ${id} does not exist`);
        }

        return assetJSON.toString();
    }

    async citizenExist(ctx, putNID) {
        // ==== Check if asset already exists ====
        let assetState = await ctx.stub.getState(putNID);
        return assetState && assetState.length > 0;
    }


   
}

module.exports = Bankabc;