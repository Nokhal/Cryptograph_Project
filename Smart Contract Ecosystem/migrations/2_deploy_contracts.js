const VersionControlLogicV1 = artifacts.require("./VersionControlLogicV1.sol");
const VersionControlProxiedV1 = artifacts.require("./VersionControlProxiedV1.sol");
const CryptographIndexLogicV1 = artifacts.require("CryptographIndexLogicV1");
const CryptographIndexProxiedV1 = artifacts.require("CryptographIndexProxiedV1");
const CryptographFactoryLogicV1 = artifacts.require("CryptographFactoryLogicV1");
const CryptographFactoryProxiedV1 = artifacts.require("CryptographFactoryProxiedV1");
const AuctionHouseLogicV1 = artifacts.require("./AuctionHouseLogicV1.sol");
const AuctionHouseProxiedV1 = artifacts.require("AuctionHouseProxiedV1");
const SingleAuctionLogicV1 = artifacts.require("./SingleAuctionLogicV1.sol");
const SingleAuctionBidLogicV1 = artifacts.require("./SingleAuctionBidLogicV1.sol");
const TheCryptographLogicV1 = artifacts.require("./TheCryptographLogicV1.sol");
const EditionIndexerLogicV1 = artifacts.require("./EditionIndexerLogicV1.sol");
const SenateLogicV1 = artifacts.require("SenateLogicV1");
const SenateProxiedV1 = artifacts.require("SenateProxiedV1");
const MintingAuctionLogicV1 = artifacts.require("./MintingAuctionLogicV1.sol");
const AuctionHouseEmptyV1 = artifacts.require("./AuctionHouseEmptyV1.sol");
const ERC2665LogicV1 = artifacts.require("./ERC2665LogicV1.sol");
const ERC2665ProxiedV1 = artifacts.require("./ERC2665ProxiedV1.sol");
const CryptographKYCLogicV1 = artifacts.require("./CryptographKYCLogicV1.sol");
const CryptographKYCProxiedV1 = artifacts.require("./CryptographKYCProxiedV1.sol");


module.exports = async(deployer, network, accounts) => {

    //Deploying the version control logic and proxy
    await deployer.deploy(VersionControlLogicV1);
    await deployer.deploy(VersionControlProxiedV1, VersionControlLogicV1.address);
    await VersionControlProxiedV1.deployed();

    //Deploying the Index logic
    await deployer.deploy(CryptographIndexLogicV1);

    //Deploying the AH logic
    await deployer.deploy(AuctionHouseLogicV1);

    //Deploying the Factory logic
    await deployer.deploy(CryptographFactoryLogicV1);

    //Deploy Single Auction logic
    await deployer.deploy(SingleAuctionLogicV1);

    //Deploy Single Auction bid logic
    await deployer.deploy(SingleAuctionBidLogicV1);

    //Deploy Cryptograph logic
    await deployer.deploy(TheCryptographLogicV1);

    //Deploy EditionIndexer logic
    await deployer.deploy(EditionIndexerLogicV1);

    //Deploy Senate logic
    await deployer.deploy(SenateLogicV1);

    //Deploy Minting Auction Logic
    await deployer.deploy(MintingAuctionLogicV1);

    //Deploy empty auction house
    await deployer.deploy(AuctionHouseEmptyV1);

    //Deploy ERC721 compatbility contract
    await deployer.deploy(ERC2665LogicV1);

    //Deploy KYC contract
    await deployer.deploy(CryptographKYCLogicV1);

    console.log("==================================");
    console.log("===== Setup of the Ecosystem =====");
    console.log("==================================");
    console.log("");

    //=======================================

    console.log("Setting up the Version Control...");

    let logicVCContract = await VersionControlLogicV1.deployed();
    let proxiedVCContract = await VersionControlProxiedV1.deployed();
    let instancedVC = await VersionControlLogicV1.at(proxiedVCContract.address);

    let targetCode = await instancedVC.code(0);

    //=======================================

    console.log("Setting up the Senate...");

    //Grabbing the already deployed logic code
    let logicSenate = await SenateLogicV1.deployed();

    //Putting the logic code address in the version control
    await instancedVC.pushVersion(logicSenate.address);

    //Grabbing our VC index
    let code_idx = (await instancedVC.codeLength()) - 1;

    //Creating the "proxied" senate, using the VC address and our VC index
    let proxiedSntContract = await deployer.deploy(SenateProxiedV1,code_idx, instancedVC.address);

    //Casting our proxy as the logic code so we can interact with it
    let instancedSnt = await SenateLogicV1.at(proxiedSntContract.address);

    //Adding our logic code address to the pool of authorized senate laws (authorized logic code addresses)
    await instancedSnt.quaranteNeufTrois(logicSenate.address, true);

    //Adding the VC logic code address to the pool of authorized senate laws (authorized logic code addresses)
    await instancedSnt.quaranteNeufTrois(logicVCContract.address, true);

    //Making the VC aware of the senate
    await instancedVC.setSenate(instancedSnt.address);

    //=======================================

    console.log("Setting up the Factory...");

    let logicFacContract = await CryptographFactoryLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicFacContract.address, true);
    await instancedVC.pushVersion(logicFacContract.address);
    code_idx = (await instancedVC.codeLength()) - 1;
    let proxiedFacContract = await deployer.deploy(CryptographFactoryProxiedV1,code_idx, instancedVC.address);
    let instancedFac = await CryptographFactoryLogicV1.at(proxiedFacContract.address);

    //=======================================

    console.log("Setting up the Index...");

    let logicIdxContract = await CryptographIndexLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicIdxContract.address, true);
    await instancedVC.pushVersion(logicIdxContract.address);
    code_idx = (await instancedVC.codeLength()) - 1;
    let proxiedIdxContract = await deployer.deploy(CryptographIndexProxiedV1,code_idx, instancedVC.address);
    let instancedIdx = await CryptographIndexLogicV1.at(proxiedIdxContract.address);

    //=======================================

    console.log("Setting up the Auction House...");

    let logicAHContract = await AuctionHouseLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicAHContract.address, true);
    await instancedVC.pushVersion(logicAHContract.address);
    let emptyAHContract = await AuctionHouseEmptyV1.deployed(); //Grabbing the featureless AH
    await instancedSnt.quaranteNeufTrois(emptyAHContract.address, true); //Adding the address to the pool but not using it
    let auctionHouse = {};
    auctionHouse.featurefull = logicAHContract.address; //remembering AHLogic address
    auctionHouse.featureless = emptyAHContract.address; //Remembering AHfeatureless address
    code_idx = (await instancedVC.codeLength()) - 1;
    auctionHouse.codeIdx = code_idx; //Remembering the AH code index
    let proxiedAHContract = await deployer.deploy(AuctionHouseProxiedV1,code_idx, instancedVC.address);
    let instancedAH = await AuctionHouseLogicV1.at(proxiedAHContract.address);

    //=======================================

    console.log("Setting up the ERC2665 Lieutenant...");

    let logicErc2665Contract = await ERC2665LogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicErc2665Contract.address, true);
    await instancedVC.pushVersion(logicErc2665Contract.address);
    code_idx = (await instancedVC.codeLength()) - 1;
    let proxiedErc2665Contract = await deployer.deploy(ERC2665ProxiedV1,code_idx, instancedVC.address);
    let instancedErc2665 = await ERC2665LogicV1.at(proxiedErc2665Contract.address);

    //=======================================

    console.log("Setting up the KYC Contract...");

    let logicKYCContract = await CryptographKYCLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicKYCContract.address, true);
    await instancedVC.pushVersion(logicKYCContract.address);
    code_idx = (await instancedVC.codeLength()) - 1;
    let proxiedKYCContract = await deployer.deploy(CryptographKYCProxiedV1,code_idx, instancedVC.address);
    let instancedKYC = await CryptographKYCLogicV1.at(proxiedKYCContract.address);

    //=======================================

    console.log("Setting up Single Auction...");

    let logicSAContract = await SingleAuctionLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicSAContract.address, true);
    await instancedVC.pushVersion(logicSAContract.address);
    let lgcSAIdx = (await instancedVC.codeLength()) - 1;

    //=======================================

    console.log("Setting up Single Auction Bid Logic...");

    let logicSABContract = await SingleAuctionBidLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicSABContract.address, true);
    await instancedVC.pushVersion(logicSABContract.address);
    let lgcSABIdx = (await instancedVC.codeLength()) - 1;

    //=======================================

    console.log("Setting up TheCryptograph Logic...");

    let logicTheCryContract = await TheCryptographLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicTheCryContract.address, true);
    await instancedVC.pushVersion(logicTheCryContract.address);
    let lgcTheCryIdx = (await instancedVC.codeLength()) - 1;

    //=======================================

    console.log("Setting up Edition Indexers...");

    let logicEditionIndexer = await EditionIndexerLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicEditionIndexer.address, true);
    await instancedVC.pushVersion(logicEditionIndexer.address);
    let lgcEdtIdx = (await instancedVC.codeLength()) - 1;

    //=======================================

    console.log("Setting up Minting Auctions...");

    let logicMintingAuction = await MintingAuctionLogicV1.deployed();
    await instancedSnt.quaranteNeufTrois(logicMintingAuction.address, true);
    await instancedVC.pushVersion(logicMintingAuction.address);
    let lgcMntAct = (await instancedVC.codeLength()) - 1;

    //=======================================

    console.log(">> ECOSYSTEM INITIALISATION <<");

    //Initing the Index
    await instancedIdx.init(instancedFac.address, lgcEdtIdx, instancedErc2665.address);

    //Initing the Auction House
    await instancedAH.init(instancedFac.address, instancedIdx.address, instancedErc2665.address, instancedKYC.address);

    //Initing the Factory
    await instancedFac.init(accounts[0], instancedVC.address, instancedAH.address, instancedIdx.address, lgcTheCryIdx, lgcSAIdx, lgcSABIdx, lgcMntAct);

    //Initing the Senate
    await instancedSnt.init(instancedIdx.address);

    //Initing the ERC2665
    await instancedErc2665.init(instancedAH.address, instancedIdx.address);

    //Initing the KYC
    await instancedKYC.init();

    //=======================================
    //Adding autoclaimer to the list of operators
    await instancedKYC.setOperator("0x31dD6B484f790e628b9A13428996191B4Fe1e823", true);

    console.log("Setup Done");
};
