/**
 *
 *      SHOULD WE DEPLOY THE CRYPTOGRAPHS ?
 *		SET TO FALSE IF YOU WANT TO RUN THE TESTS FASTER
 */

let should_deploy = true;

/**
/**
 *
 *      Cryptographs
 *
 */


let Cryptograph001 = {};
Cryptograph001.name = "Quadratic Funding"; //The name of the cryptograph
Cryptograph001.creator = "Vitalik Buterin"; //The creator of the cryptograph
Cryptograph001.auctionStartTime = Math.round((new Date("2020-06-18T17:00:00Z").getTime() / 1000)); //The epoch timestamp in seconds of when the auction should start
Cryptograph001.auctionSecondsDuration = 24 * 60 * 60; //The duration of the auction in seconds.
Cryptograph001.perpetualAltruismCut = 100000; //100% of the proceeds
Cryptograph001.mediaHash = "VBHSH";
Cryptograph001.mediaURL = "your Custom url";
Cryptograph001.toLock = true;


let CryptographsToMint = [];
CryptographsToMint.push(null);
CryptographsToMint.push(Cryptograph001);

/**
 *
 *      Artifacts
 *
 */

const VersionControlLogicV1 = artifacts.require("./VersionControlLogicV1.sol");
const VersionControlProxiedV1 = artifacts.require("./VersionControlProxiedV1.sol");
const CryptographIndexLogicV1 = artifacts.require("CryptographIndexLogicV1");
const CryptographIndexProxiedV1 = artifacts.require("CryptographIndexProxiedV1");
const CryptographFactoryLogicV1 = artifacts.require("CryptographFactoryLogicV1");
const CryptographFactoryProxiedV1 = artifacts.require("CryptographFactoryProxiedV1");
const AuctionHouseLogicV1 = artifacts.require("./AuctionHouseLogicV1.sol");
const AuctionHouseProxiedV1 = artifacts.require("AuctionHouseProxiedV1");
const SenateLogicV1 = artifacts.require("SenateLogicV1");
const SenateProxiedV1 = artifacts.require("SenateProxiedV1");
const ERC2665LogicV1 = artifacts.require("./ERC2665LogicV1.sol");
const ERC2665ProxiedV1 = artifacts.require("./ERC2665ProxiedV1.sol");
const CryptographKYCLogicV1 = artifacts.require("./CryptographKYCLogicV1.sol");
const CryptographKYCProxiedV1 = artifacts.require("./CryptographKYCProxiedV1.sol");
const CryptographInitiator = artifacts.require("CryptographInitiator");

/**
 *
 *      Referenced objects
 *
 */

let proxiedVCContract;
let instancedVC;
let proxiedSntContract;
let instancedSnt;
let proxiedFacContract;
let instancedFac;
let proxiedIdxContract;
let instancedIdx;
let proxiedAHContract;
let instancedAH;
let proxiedErc2665Contract;
let instancedErc2665;
let proxiedKYCContract;
let instancedKYC;

let perpetualAltruism;
let publisher;
let charity;
let thirdParty;

let globalTmp = {};

let MintACryptograph = async function (_cryptograph, _factory, _completeSetup) {

    let initer = {};

    if (_cryptograph == null) {
        _cryptograph = {};
    }

    //name
    if (_cryptograph.name == undefined) {
        initer.name = "Test Osterone";
    } else {
        initer.name = _cryptograph.name
    }

    //creator
    if (_cryptograph.creator == undefined) {
        initer.creator = "Guillaume Gonnaud";
    } else {
        initer.creator = _cryptograph.creator
    }

    //auctionStartTime
    if (_cryptograph.auctionStartTime == undefined) {
        initer.auctionStartTime = (await web3.eth.getBlock('latest')).timestamp + 30 * 60; //Default Auction start is in 30mn;
    } else {
        initer.auctionStartTime = _cryptograph.auctionStartTime
    }

    //auctionSecondsDuration
    if (_cryptograph.auctionSecondsDuration == undefined) {
        initer.auctionSecondsDuration = 3600; //Default Auction last for 1Hour
    } else {
        initer.auctionSecondsDuration = _cryptograph.auctionSecondsDuration
    }

    //publisher
    if (_cryptograph.publisher == undefined) {
        initer.publisher = perpetualAltruism;
    } else {
        initer.publisher = _cryptograph.publisher;
    }

    //publisherCut
    if (_cryptograph.publisherCut == undefined) {
        initer.publisherCut = 0;
    } else {
        initer.publisherCut = _cryptograph.publisherCut;
    }

    //charity
    if (_cryptograph.charity == undefined) {
        initer.charity = charity;
    } else {
        initer.charity = _cryptograph.charity;
    }

    //charityCut
    if (_cryptograph.charityCut == undefined) {
        initer.charityCut = 0;
    } else {
        initer.charityCut = _cryptograph.charityCut;
    }

    //thirdParty
    if (_cryptograph.thirdParty == undefined) {
        initer.thirdParty = thirdParty;
    } else {
        initer.thirdParty = _cryptograph.thirdParty;
    }

    //thirdPartyCut
    if (_cryptograph.thirdPartyCut == undefined) {
        initer.thirdPartyCut = 0;
    } else {
        initer.thirdPartyCut = _cryptograph.thirdPartyCut;
    }

    //perpetualAltruismCut
    if (_cryptograph.perpetualAltruismCut == undefined) {
        initer.perpetualAltruismCut = 25000;
    } else {
        initer.perpetualAltruismCut = _cryptograph.perpetualAltruismCut;
    }

    //startingPrice
    if (_cryptograph.startingPrice == undefined) {
        initer.startingPrice = 1;
    } else {
        initer.startingPrice = _cryptograph.startingPrice;
    }

    //mediaHash
    if (_cryptograph.mediaHash == undefined) {
        initer.mediaHash = "Steack Hashe";
    } else {
        initer.mediaHash = _cryptograph.mediaHash;
    }

    //mediaUrl
    if (_cryptograph.mediaUrl == undefined) {
        initer.mediaUrl = "Url a la Lune";
    } else {
        initer.mediaUrl = _cryptograph.mediaUrl;
    }

    //maxSupply (only useful for edition)
    if (_cryptograph.maxSupply == undefined) {
        initer.maxSupply = 1;
    } else {
        initer.maxSupply = _cryptograph.maxSupply;
    }

    //cryptographIssue (only useful for edition)
    if (_cryptograph.cryptographIssue == undefined) {
        initer.cryptographIssue = 1;
    } else {
        initer.cryptographIssue = _cryptograph.cryptographIssue;
    }

    //Creating the emitter
    let cryIniter = await CryptographInitiator.new(
            initer.name, //Name
            initer.auctionStartTime, initer.auctionSecondsDuration, //Auction starts in 20 second and lasts for 1 hour
            initer.publisher, initer.publisherCut, //Publisher address and cut (the person that will setup auction, publish the medias, etc. usually yourself)
            initer.charity, initer.charityCut, //Charity Address and cut - Money that PA manage but is clearly seen as going through a different stream
            initer.thirdParty, initer.thirdPartyCut, //Third Party - Random dude
            initer.perpetualAltruismCut, //PA cut. 
            initer.maxSupply, //Unique
            initer.startingPrice, //Minimal Starting Price
            initer.cryptographIssue //Cryptograph Issue#. Only for editions.
        );

    //Setting Creator, Hash and URL
    await cryIniter.setMediaHash(initer.mediaHash);

    await cryIniter.setMediaUrl(initer.mediaUrl);

    await cryIniter.setCreator(initer.creator);

    //Publishing the cryptograph
    let cryEmiter = await _factory.createCryptograph(cryIniter.address);

    globalTmp.mintLogs = cryEmiter.logs;

    //Return the {issue, serial}
    ID = {};
    ID.issue = cryEmiter.logs[0].args.cryptographIssue.toNumber(); //Grabbing straight from the logs
    ID.serial = 1; //Always 1 in the case of single auctions

    //Locking the cryptograph
    if (_completeSetup) {
        await _factory.lockAuction(ID.issue, ID.serial);
    }

    return ID;

}

//Wrapping web3 request for use in Contract
const promisify = (inner) =>
new Promise((resolve, reject) =>
    inner((err, res) => {
        if (err) {
            reject(err)
        }
        resolve(res);
    }));

//Return the current eth amount in an account
//https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#getbalance
const getBalance = (account, at) =>
promisify(cb => web3.eth.getBalance(account, at, cb));

module.exports = async(deployer, network, accounts) => {

    //Set to true to prevent minting the cryptographs and practice tests
    if (!should_deploy) {
        console.log("===== CRYPTOGRAPHS NOT MINTED, beginning tests =====");
        return;
    } else {

        let accountEthBeforeMigration = await getBalance(accounts[0]);

        console.log("");
        console.log("");
        console.log("====================================");
        console.log("======= MINTING CRYPTOGRAPHS =======");
        console.log("====================================");

        //VC
        proxiedVCContract = await VersionControlProxiedV1.deployed();
        instancedVC = await VersionControlLogicV1.at(proxiedVCContract.address);

        //Senate
        proxiedSntContract = await SenateProxiedV1.deployed();
        instancedSnt = await SenateLogicV1.at(proxiedSntContract.address);

        //Factory
        proxiedFacContract = await CryptographFactoryProxiedV1.deployed();
        instancedFac = await CryptographFactoryLogicV1.at(proxiedFacContract.address);

        let checkPA = await instancedFac.officialPublisher();

        //Index
        proxiedIdxContract = await CryptographIndexProxiedV1.deployed();
        instancedIdx = await CryptographIndexLogicV1.at(proxiedIdxContract.address);

        //Auction House
        proxiedAHContract = await AuctionHouseProxiedV1.deployed();
        instancedAH = await AuctionHouseLogicV1.at(proxiedAHContract.address);

        //ERC2665
        proxiedErc2665Contract = await ERC2665ProxiedV1.deployed();
        instancedErc2665 = await ERC2665LogicV1.at(proxiedErc2665Contract.address);

        //KYC
        proxiedKYCContract = await CryptographKYCProxiedV1.deployed();
        instancedKYC = await CryptographKYCLogicV1.at(proxiedKYCContract.address);

        perpetualAltruism = accounts[0];
        publisher = accounts[0];
        charity = accounts[0];
        thirdParty = accounts[0];

        let ID;
        for (i = 1; i < CryptographsToMint.length; i++) {
            ID = await MintACryptograph(CryptographsToMint[i], instancedFac, CryptographsToMint[i].toLock);
            console.log("Minted Cryptograph I:" + ID.issue + " S:" + ID.serial + ' >> "' + CryptographsToMint[i].name + '" by ' + CryptographsToMint[i].creator);
        }

        let accountEthLeftover = await getBalance(accounts[0]);
        let stringed = accountEthBeforeMigration.toString();
        let aftercomma = "669840840000000000";
        while (stringed.length <= aftercomma.length) {
            stringed = "0" + stringed;
        }

        //inserting a comma
        stringed = stringed.substring(0, stringed.length - aftercomma.length) + "." + stringed.substring(stringed.length - aftercomma.length);

        console.log("");
        console.log("");
        console.log("Balance in account before Cryptographs Minting: " + stringed + "ETH");

        stringed = accountEthLeftover.toString();
        aftercomma = "669840840000000000";
        while (stringed.length <= aftercomma.length) {
            stringed = "0" + stringed;
        }

        //inserting a comma
        stringed = stringed.substring(0, stringed.length - aftercomma.length) + "." + stringed.substring(stringed.length - aftercomma.length);

        console.log("Balance in account after Cryptographs Minting: " + stringed + "ETH");

    }
}
