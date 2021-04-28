// /*
//  * Copyright IBM Corp. All Rights Reserved.
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */
//
// 'use strict';
//
// const { Contract } = require('fabric-contract-api');
//
// class TDrive extends Contract {
//
//     // async InitLedger(ctx) {
//     //     const assets = [
//     //         {
//     //             ID: 'asset1',
//     //             Color: 'blue',
//     //             Size: 5,
//     //             Owner: 'Tomoko',
//     //             AppraisedValue: 300,
//     //         },
//     //         {
//     //             ID: 'asset2',
//     //             Color: 'red',
//     //             Size: 5,
//     //             Owner: 'Brad',
//     //             AppraisedValue: 400,
//     //         },
//     //         {
//     //             ID: 'asset3',
//     //             Color: 'green',
//     //             Size: 10,
//     //             Owner: 'Jin Soo',
//     //             AppraisedValue: 500,
//     //         },
//     //         {
//     //             ID: 'asset4',
//     //             Color: 'yellow',
//     //             Size: 10,
//     //             Owner: 'Max',
//     //             AppraisedValue: 600,
//     //         },
//     //         {
//     //             ID: 'asset5',
//     //             Color: 'black',
//     //             Size: 15,
//     //             Owner: 'Adriana',
//     //             AppraisedValue: 700,
//     //         },
//     //         {
//     //             ID: 'asset6',
//     //             Color: 'white',
//     //             Size: 15,
//     //             Owner: 'Michel',
//     //             AppraisedValue: 800,
//     //         },
//     //     ];
//     //
//     //     for (const asset of assets) {
//     //         asset.docType = 'asset';
//     //         await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
//     //         console.info(`Asset ${asset.ID} initialized`);
//     //     }
//     // }
//
//     // CreateAsset issues a new asset to the world state with given details.
//
//     async CreateUser(ctx, key, email, password, name) {
//         const user  = {
//             Key: key,
//             Email: email,
//             Password: password,
//             Name: name,
//             Doctype:'user'
//         };
//         ctx.stub.putState(key, Buffer.from(JSON.stringify(user)));
//         return JSON.stringify(user);
//     }
//
//
//     // ReadAsset returns the asset stored in the world state with given key.
//     async FindUser(ctx, email,password) {
//         const key= `user_${email}`;
//
//         const userJSON = await ctx.stub.getState(key); // get the asset from chaincode state
//         if (!userJSON || userJSON.length === 0) {
//             throw new Error(`The user with ${email} does not exist`);
//         }
//
//         const user = JSON.parse(userJSON.toString());
//         if(user.Password!== password){
//             throw  new Error(`Email and password dont match in our database `);
//
//         }
//
//         return userJSON.toString();
//     }
//
//     // UpdateAsset updates an existing asset in the world state with provided parameters.
//     async UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
//         const exists = await this.AssetExists(ctx, id);
//         if (!exists) {
//             throw new Error(`The asset ${id} does not exist`);
//         }
//
//         // overwriting original asset with new asset
//         const updatedAsset = {
//             ID: id,
//             Color: color,
//             Size: size,
//             Owner: owner,
//             AppraisedValue: appraisedValue,
//         };
//         return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedAsset)));
//     }
//
//     // DeleteAsset deletes an given asset from the world state.
//     async DeleteAsset(ctx, id) {
//         const exists = await this.AssetExists(ctx, id);
//         if (!exists) {
//             throw new Error(`The asset ${id} does not exist`);
//         }
//         return ctx.stub.deleteState(id);
//     }
//
//     // AssetExists returns true when asset with given ID exists in world state.
//     async AssetExists(ctx, id) {
//         const userJSON = await ctx.stub.getState(id);
//         return userJSON && userJSON.length > 0;
//     }
//
//     // TransferAsset updates the owner field of asset with given id in the world state.
//     async TransferAsset(ctx, id, newOwner) {
//         const assetString = await this.ReadAsset(ctx, id);
//         const asset = JSON.parse(assetString);
//         asset.Owner = newOwner;
//         return ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
//     }
//
//     // GetAllAssets returns all assets found in the world state.
//     async GetAllAssets(ctx) {
//         const allResults = [];
//         // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
//         const iterator = await ctx.stub.getStateByRange('', '');
//         let result = await iterator.next();
//         while (!result.done) {
//             const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
//             let record;
//             try {
//                 record = JSON.parse(strValue);
//             } catch (err) {
//                 console.log(err);
//                 record = strValue;
//             }
//             allResults.push({ Key: result.value.key, Record: record });
//             result = await iterator.next();
//         }
//         return JSON.stringify(allResults);
//     }
//
//
// }
//
// module.exports = TDrive;

/*
 SPDX-License-Identifier: Apache-2.0
*/

// ====CHAINCODE EXECUTION SAMPLES (CLI) ==================

// ==== Invoke assets ====
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["CreateAsset","asset1","blue","35","Tom","100"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["CreateAsset","asset2","red","50","Tom","150"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["CreateAsset","asset3","blue","70","Tom","200"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["TransferAsset","asset2","jerry"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["TransferAssetsBasedOnColor","blue","jerry"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["DeleteAsset","asset1"]}'

// ==== Query assets ====
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["ReadAsset","asset1"]}'
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["GetAssetsByRange","asset1","asset3"]}'
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["GetAssetHistory","asset1"]}'

// Rich Query (Only supported if CouchDB is used as state database):
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssetsByOwner","Tom"]}' output issue
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssets","{\"selector\":{\"owner\":\"Tom\"}}"]}'

// Rich Query with Pagination (Only supported if CouchDB is used as state database):
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssetsWithPagination","{\"selector\":{\"owner\":\"Tom\"}}","3",""]}'

// INDEXES TO SUPPORT COUCHDB RICH QUERIES
//
// Indexes in CouchDB are required in order to make JSON queries efficient and are required for
// any JSON query with a sort. Indexes may be packaged alongside
// chaincode in a META-INF/statedb/couchdb/indexes directory. Each index must be defined in its own
// text file with extension *.json with the index definition formatted in JSON following the
// CouchDB index JSON syntax as documented at:
// http://docs.couchdb.org/en/2.3.1/api/database/find.html#db-index
//
// This asset transfer ledger example chaincode demonstrates a packaged
// index which you can find in META-INF/statedb/couchdb/indexes/indexOwner.json.
//
// If you have access to the your peer's CouchDB state database in a development environment,
// you may want to iteratively test various indexes in support of your chaincode queries.  You
// can use the CouchDB Fauxton interface or a command line curl utility to create and update
// indexes. Then once you finalize an index, include the index definition alongside your
// chaincode in the META-INF/statedb/couchdb/indexes directory, for packaging and deployment
// to managed environments.
//
// In the examples below you can find index definitions that support asset transfer ledger
// chaincode queries, along with the syntax that you can use in development environments
// to create the indexes in the CouchDB Fauxton interface or a curl command line utility.
//

// Index for docType, owner.
//
// Example curl command line to define index in the CouchDB channel_chaincode database
// curl -i -X POST -H "Content-Type: application/json" -d "{\"index\":{\"fields\":[\"docType\",\"owner\"]},\"name\":\"indexOwner\",\"ddoc\":\"indexOwnerDoc\",\"type\":\"json\"}" http://hostname:port/myc1_assets/_index
//

// Index for docType, owner, size (descending order).
//
// Example curl command line to define index in the CouchDB channel_chaincode database
// curl -i -X POST -H "Content-Type: application/json" -d "{\"index\":{\"fields\":[{\"size\":\"desc\"},{\"docType\":\"desc\"},{\"owner\":\"desc\"}]},\"ddoc\":\"indexSizeSortDoc\", \"name\":\"indexSizeSortDesc\",\"type\":\"json\"}" http://hostname:port/myc1_assets/_index

// Rich Query with index design doc and index name specified (Only supported if CouchDB is used as state database):
//   peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssets","{\"selector\":{\"docType\":\"asset\",\"owner\":\"Tom\"}, \"use_index\":[\"_design/indexOwnerDoc\", \"indexOwner\"]}"]}'

// Rich Query with index design doc specified only (Only supported if CouchDB is used as state database):
//   peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssets","{\"selector\":{\"docType\":{\"$eq\":\"asset\"},\"owner\":{\"$eq\":\"Tom\"},\"size\":{\"$gt\":0}},\"fields\":[\"docType\",\"owner\",\"size\"],\"sort\":[{\"size\":\"desc\"}],\"use_index\":\"_design/indexSizeSortDoc\"}"]}'

'use strict';

const {Contract} = require('fabric-contract-api');

class TDrive extends Contract {
    //-------------------------------------------------------------------------------

    // CreateAsset - create a new asset, store into TDrive state
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

        let assetAsBytes = await ctx.stub.getState(key);
        if (!assetAsBytes || !assetAsBytes.toString()) {
            throw new Error(`Asset ${key} does not exist`);
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

    // delete - remove a asset key/value pair from state
    async DeleteAsset(ctx, id) {
        if (!id) {
            throw new Error('Asset name must not be empty');
        }

        let exists = await this.citizenExist(ctx, id);
        if (!exists) {
            throw new Error(`Asset ${id} does not exist`);
        }

        // to maintain the color~name index, we need to read the asset first and get its color
        let valAsbytes = await ctx.stub.getState(id); // get the asset from TDrive state
        let jsonResp = {};
        if (!valAsbytes) {
            jsonResp.error = `Asset does not exist: ${id}`;
            throw new Error(jsonResp);
        }
        let assetJSON;
        try {
            assetJSON = JSON.parse(valAsbytes.toString());
        } catch (err) {
            jsonResp = {};
            jsonResp.error = `Failed to decode JSON of: ${id}`;
            throw new Error(jsonResp);
        }
        await ctx.stub.deleteState(id); //remove the asset from TDrive state

        // delete the index
        let indexName = 'color~name';
        let colorNameIndexKey = ctx.stub.createCompositeKey(indexName, [assetJSON.color, assetJSON.assetID]);
        if (!colorNameIndexKey) {
            throw new Error(' Failed to create the createCompositeKey');
        }
        //  Delete index entry to state.
        await ctx.stub.deleteState(colorNameIndexKey);
    }

    // TransferAsset transfers a asset by setting a new owner name on the asset
    async TransferAsset(ctx, assetName, newOwner) {

        let assetAsBytes = await ctx.stub.getState(assetName);
        if (!assetAsBytes || !assetAsBytes.toString()) {
            throw new Error(`Asset ${assetName} does not exist`);
        }
        let assetToTransfer = {};
        try {
            assetToTransfer = JSON.parse(assetAsBytes.toString()); //unmarshal
        } catch (err) {
            let jsonResp = {};
            jsonResp.error = 'Failed to decode JSON of: ' + assetName;
            throw new Error(jsonResp);
        }
        assetToTransfer.owner = newOwner; //change the owner

        let assetJSONasBytes = Buffer.from(JSON.stringify(assetToTransfer));
        await ctx.stub.putState(assetName, assetJSONasBytes); //rewrite the asset
    }

    // GetAssetsByRange performs a range query based on the start and end keys provided.
    // Read-only function results are not typically submitted to ordering. If the read-only
    // results are submitted to ordering, or if the query is used in an update transaction
    // and submitted to ordering, then the committing peers will re-execute to guarantee that
    // result sets are stable between endorsement time and commit time. The transaction is
    // invalidated by the committing peers if the result set has changed between endorsement
    // time and commit time.
    // Therefore, range queries are a safe option for performing update transactions based on query results.
    async GetAssetsByRange(ctx, startKey, endKey) {

        let resultsIterator = await ctx.stub.getStateByRange(startKey, endKey);
        let results = await this.GetAllResults(resultsIterator, false);

        return JSON.stringify(results);
    }

    // TransferAssetBasedOnColor will transfer assets of a given color to a certain new owner.
    // Uses a GetStateByPartialCompositeKey (range query) against color~name 'index'.
    // Committing peers will re-execute range queries to guarantee that result sets are stable
    // between endorsement time and commit time. The transaction is invalidated by the
    // committing peers if the result set has changed between endorsement time and commit time.
    // Therefore, range queries are a safe option for performing update transactions based on query results.
    // Example: GetStateByPartialCompositeKey/RangeQuery
    async TransferAssetByColor(ctx, color, newOwner) {
        // Query the color~name index by color
        // This will execute a key range query on all keys starting with 'color'
        let coloredAssetResultsIterator = await ctx.stub.getStateByPartialCompositeKey('color~name', [color]);

        // Iterate through result set and for each asset found, transfer to newOwner
        let responseRange = await coloredAssetResultsIterator.next();
        while (!responseRange.done) {
            if (!responseRange || !responseRange.value || !responseRange.value.key) {
                return;
            }

            let objectType;
            let attributes;
            (
                {objectType, attributes} = await ctx.stub.splitCompositeKey(responseRange.value.key)
            );

            console.log(objectType);
            let returnedAssetName = attributes[1];

            // Now call the transfer function for the found asset.
            // Re-use the same function that is used to transfer individual assets
            await this.TransferAsset(ctx, returnedAssetName, newOwner);
            responseRange = await coloredAssetResultsIterator.next();
        }
    }

    // QueryAssetsByOwner queries for assets based on a passed in owner.
    // This is an example of a parameterized query where the query logic is baked into the TDrive,
    // and accepting a single query parameter (owner).
    // Only available on state databases that support rich query (e.g. CouchDB)
    // Example: Parameterized rich query
    async QueryAssetsByOwner(ctx, owner) {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.docType = 'asset';
        queryString.selector.owner = owner;
        return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
    }

    // Example: Ad hoc rich query
    // QueryAssets uses a query string to perform a query for assets.
    // Query string matching state database syntax is passed in and executed as is.
    // Supports ad hoc queries that can be defined at runtime by the client.
    // If this is not desired, follow the QueryAssetsForOwner example for parameterized queries.
    // Only available on state databases that support rich query (e.g. CouchDB)
    async QueryAssets(ctx, queryString) {
        return await this.GetQueryResultForQueryString(ctx, queryString);
    }

    // GetQueryResultForQueryString executes the passed in query string.
    // Result set is built and returned as a byte array containing the JSON results.
    async GetQueryResultForQueryString(ctx, queryString) {

        let resultsIterator = await ctx.stub.getQueryResult(queryString);
        let results = await this.GetAllResults(resultsIterator, false);

        return JSON.stringify(results);
    }

    // Example: Pagination with Range Query
    // GetAssetsByRangeWithPagination performs a range query based on the start & end key,
    // page size and a bookmark.
    // The number of fetched records will be equal to or lesser than the page size.
    // Paginated range queries are only valid for read only transactions.
    async GetAssetsByRangeWithPagination(ctx, startKey, endKey, pageSize, bookmark) {

        const {iterator, metadata} = await ctx.stub.getStateByRangeWithPagination(startKey, endKey, pageSize, bookmark);
        const results = await this.GetAllResults(iterator, false);

        results.ResponseMetadata = {
            RecordsCount: metadata.fetched_records_count,
            Bookmark: metadata.bookmark,
        };
        return JSON.stringify(results);
    }

    // Example: Pagination with Ad hoc Rich Query
    // QueryAssetsWithPagination uses a query string, page size and a bookmark to perform a query
    // for assets. Query string matching state database syntax is passed in and executed as is.
    // The number of fetched records would be equal to or lesser than the specified page size.
    // Supports ad hoc queries that can be defined at runtime by the client.
    // If this is not desired, follow the QueryAssetsForOwner example for parameterized queries.
    // Only available on state databases that support rich query (e.g. CouchDB)
    // Paginated queries are only valid for read only transactions.
    async QueryAssetsWithPagination(ctx, queryString, pageSize, bookmark) {

        const {iterator, metadata} = await ctx.stub.getQueryResultWithPagination(queryString, pageSize, bookmark);
        const results = await this.GetAllResults(iterator, false);

        results.ResponseMetadata = {
            RecordsCount: metadata.fetched_records_count,
            Bookmark: metadata.bookmark,
        };

        return JSON.stringify(results);
    }

    // // GetAssetHistory returns the chain of custody for an asset since issuance.
    // async GetAssetHistory(ctx, assetName) {
    //
    //     let resultsIterator = await ctx.stub.getHistoryForKey(assetName);
    //     let results = await this.GetAllResults(resultsIterator, true);
    //
    //     return JSON.stringify(results);
    // }

    // citizenExist returns true when asset with given ID exists in world state
    async citizenExist(ctx, putNID) {
        // ==== Check if asset already exists ====
        let assetState = await ctx.stub.getState(putNID);
        return assetState && assetState.length > 0;
    }

    async GetAllResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                allResults.push(jsonRes);
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }

    // InitLedger creates sample assets in the ledger
    async InitLedger(ctx) {
        const citizens  = [
            {
                NID: '100',
                name: 'abul',

            },
            {
                NID: '101',
                name: 'babul',

            },
            {
                NID: '102',
                name: 'cabul',

            },
            {
                NID: '103',
                name: 'dabul',
            },

            {
                NID: '104',
                name: 'black',

            },
            {
                NID: '105',
                name: 'white',

            },
        ];

        // for (const citizen of citizens) {
        //     await this.CreateAsset(
        //         ctx,
        //         citizen.NID,
        //         citizen.name,
        //
        //     );
        // }
    }
}

module.exports = TDrive;