

/*
 SPDX-License-Identifier: Apache-2.0
*/

// ====CHAINCODE EXECUTION SAMPLES (CLI) ==================


'use strict';

const {Contract} = require('fabric-contract-api');

class TDrive extends Contract {
  async InitLedger(ctx) {
    const citizens = [
      {
        Key: '100',
        Name: 'Rinkon',
        DOB: '1999',
        Address:'Gazipur,Dhaka',

      },
      {
        Key: '101',
        Name: 'Sagor',
        DOB: '1998',
        Address:'Noyapara,Noakhali',

      },
      {
        Key: '102',
        Name: 'Arif',
        DOB: '1995',
        Address:'Akhalia,Sylhet',

      },
      {
        Key: '103',
        Name: 'Shuvo',
        DOB: '2000',
        Address:'Kurigran,Rongpur',

      },
      {
        Key: '104',
        Name: 'Yamin',
        DOB: '2009',
        Address:'Kashimpur,Gazipur',

      },
      {
        Key: '105',
        Name: 'Sabbir',
        DOB: '1999',
        Address:'Curmitola,Dhaka',

      },
      {
        Key: '106',
        Name: 'Rajib',
        DOB: '1996',
        Address:'Konabari,Gazipur',

      },
      {
        Key: '107',
        Name: 'Sabbir',
        DOB: '1999',
        Address:'Uttara,Dokkhinkhan,Dhaka',

      },
      {
        Key: '108',
        Name: 'Saabbir',
        DOB: '1989',
        Address:'Motijheel,184/3 Arambag',

      },
    ];

    for (const citizen of citizens) {
      citizen.docType = 'Citizen';
      await ctx.stub.putState(citizen.Key, Buffer.from(JSON.stringify(citizens)));
      console.info(`Citizen initialized`);
    }
  }

  //-------------------------------------------------------------------------------

  // CreateAsset - create a new asset, store into TDrive state
  async CreateUser(ctx, key, email, password, name) {
    let balance=0;

    let accountAsBytes = await ctx.stub.getState(key);
    if (!accountAsBytes || !accountAsBytes.toString()) {
      throw new Error(`Citizen With NID:${key} does not exist in Bangladesh national Database`);
    }

    let TargetAccount = {};
    try {
      TargetAccount = JSON.parse(accountAsBytes.toString()); //unmarshal
    } catch (err) {
      let jsonResp = {};
      jsonResp.error = 'Failed to decode JSON of: ' + key;
      throw new Error(jsonResp);
    }
    // if(TargetAccount.Name !== name){
    //     throw new  Error (`This name with NID:${key} doesnt match with Bangladesh National Database`) ;
    // }

    if(parseInt(TargetAccount.DOB)> parseInt(2003)){
      throw new  Error (`You are not old enough to open a Bank account`);
    }

    const user  = {
      Key: key,
      Email: email,
      Password: password,
      Name: name,
      Balance: balance,
      Doctype:'user'
    };
    ctx.stub.putState(key, Buffer.from(JSON.stringify(user)));
    //return JSON.stringify(user);
    return(`Account Create Successfull \nAccount Holder name: ${user.Name} \nAccount key:${user.Key} \n\nPlease remember the password you gave.Without password you will not be able to withdraw or send money`)
  }
  //------------------------------------------------------------------------------


  // async DepositMoney(ctx, key,amount) {
  //
  //     const userJSON = await ctx.stub.getState(key); // get the asset from chaincode state
  //     if (!userJSON || userJSON.length === 0) {
  //         throw new Error(`The user with ${key} does not exist`);
  //     }
  //
  //     const user = JSON.parse(userJSON.toString());
  //
  //     user.Balance = user.Balance+ amount ;
  //     let assetJSONasBytes = Buffer.from(JSON.stringify(key));
  //     await ctx.stub.putState(key, assetJSONasBytes);
  //
  //     return userJSON.toString();
  // }

  async DepositMoney(ctx, key, amount) {

    let accountAsBytes = await ctx.stub.getState(key);
    if (!accountAsBytes || !accountAsBytes.toString()) {
      throw new Error(`Account ${key} does not exist`);
    }
    let TargetAccount = {};
    try {
      TargetAccount = JSON.parse(accountAsBytes.toString()); //unmarshal
    } catch (err) {
      let jsonResp = {};
      jsonResp.error = 'Failed to decode JSON of: ' + key;
      throw new Error(jsonResp);
    }
    if(TargetAccount.Password)
    {
      TargetAccount.Balance = parseInt(TargetAccount.Balance)+parseInt(amount);

      let assetJSONasBytes = Buffer.from(JSON.stringify(TargetAccount));
      await ctx.stub.putState(key, assetJSONasBytes); //rewrite the asset
      return(`Deposit Successfull\nDeposited to ${TargetAccount.Name}\nDeposited Amount:${amount}\thank you for using our bank`)
    }
    return(`There is no account against this NID`);

  }
  //-----------------------------------------------------------------------

  // async WithDrawMoney(ctx, key,password,amount) {
  //
  //     const userJSON = await ctx.stub.getState(key); // get the asset from chaincode state
  //     if (!userJSON || userJSON.length === 0) {
  //         throw new Error(`The user with ${key} does not exist`);
  //     }
  //
  //     const user = JSON.parse(userJSON.toString());
  //     if(user.Password!== password){
  //         throw  new Error(`${key} and password dont match in our database `);
  //
  //     }
  //     if(user.Balance <  amount){
  //         throw  new Error(`You dont have ${amount} taka  to withdraw `);
  //
  //     }
  //     user.Balance-=amount;
  //
  //     return userJSON.toString();
  // }
  //--------------------------------------------------------------------------------
  async WithDrawMoney(ctx, key,password, amount) {

    let accountAsBytes = await ctx.stub.getState(key);
    if (!accountAsBytes || !accountAsBytes.toString()) {
      throw new Error(`Account ${key} does not exist`);
    }

    let TargetAccount = {};
    try {
      TargetAccount = JSON.parse(accountAsBytes.toString()); //unmarshal
    } catch (err) {
      let jsonResp = {};
      jsonResp.error = 'Failed to decode JSON of: ' + key;
      throw new Error(jsonResp);
    }
    if(TargetAccount.Password !== password){
      throw new  Error (`This password with key: ${key} doesnt match`) ;
    }
    if(parseInt(TargetAccount.Balance)< parseInt(amount)){
      throw new  Error (`You Dont have taka : ${amount} `) ;
    }
    TargetAccount.Balance = parseInt(TargetAccount.Balance)-parseInt(amount);
    let namee=TargetAccount.Name;

    let assetJSONasBytes = Buffer.from(JSON.stringify(TargetAccount));
    await ctx.stub.putState(key, assetJSONasBytes); //rewrite the asset
    return (`withdrawal successfull\nAmount withdrawed:taka${amount} only`);
  }
 

  async SendMoney(ctx,from_key,to_key,from_password,amount){

    await this.WithDrawMoney(ctx,from_key,from_password,amount);

    await this.DepositMoney(ctx,to_key,amount);
   return(`Send money succesfull \n Money sent from Account:${from_key}\n Money sent to:${to_key}\nAmount:${amount}`);
  }

  async citizenExist(ctx, putNID) {
    // ==== Check if asset already exists ====
    let assetState = await ctx.stub.getState(putNID);
    return assetState && assetState.length > 0;
  }


}

module.exports = Bankabc;
