# Cryptograph

Welcome to The Cryptograph Project Github.

Things are still under construction as we are busy launching, but you can already inspect the code of the published ecosystem in this repo. 

Future changes and improvements to the codebase will also be made public here.  


### Deployed Contracts
These are the main contracts that are part of the Cryptograph ecosystem.   
  
Audit for the deployed codebase (Quanstamp) : [PDF](https://cryptographwebsitebucket.s3.eu-west-2.amazonaws.com/Cryptograph-Audit-Report.pdf)

To interact with them, cast the relevant Logic Contract ABI on a Proxied Contract address.   

To find the address of a specific Cryptograph, either use the Indexer or the ERC2665 contract. The tokenID are just Individual Cryptographs addresses cast as uint256.    
  
'VersionControlLogicV1'  
0x9b49Cf5a091B313fA4AD1f8f3A4d6B325d76F502  
  
'VersionControlProxiedV1'  
0x1a9700c73FC51571E5dA48adF1C58e084084270F  

'CryptographIndexLogicV1'  
0x42818e37383d9b31C29316780c8491ba0BF3Df57  

'AuctionHouseLogicV1'  
0xf607014406bc3Fa7aAB224a85A0318b4556e9C28  
  
'CryptographFactoryLogicV1'  
0xF04C879F52e700874A170c4C4e45b453Bd8234c6  
  
'SingleAuctionLogicV1'  
0x1EEd26e3723Ff747C6ce374121c7fc29BDac3570  
  
'SingleAuctionBidLogicV1'  
0x73d0E4Ed50f8ae11634273263F37C15Bd164eCe9  
  
'TheCryptographLogicV1'  
0xEB3F8Ed02E96dCd1EbE3f111B4F09FEfaDA20486  
  
'EditionIndexerLogicV1'  
0x48546182b90eD519b5A67DAc19894B9060a879ce  
  
'SenateLogicV1'  
0xD0453BDC61aDBd833e65f0B2Cb9720f99A9Ed6E2  
  
'MintingAuctionLogicV1'  
0xBA0C786C8Ed053bDF235BD7726096079977a2a3C  
  
'AuctionHouseEmptyV1'  
0x1472f3B35840B5bF078a2953cBfAc17e85b0AE0c  
  
'ERC2665LogicV1'  
0x0D5E41f858761537f2C7Ee8E25650F330C58161C  
  
'CryptographKYCLogicV1'  
0xfD6dBc7De22Eb28B8997275320f5F1ab89370788  
  
'CryptographInitiator'  
0x62922C2593eAD0D4DA35a80F7708929045Ab7D67  
  
'SenateProxiedV1'  
0x4FdA6A8c105AB08fAC775De24Ca3Ac0b810efC86  
  
'CryptographFactoryProxiedV1'  
0xaFE3cc1dCF535E354b6c7F7e978118c945F280f3  
  
'CryptographIndexProxiedV1'  
0x0dB85A3CeF9CE2b79bA71fC3Bd0EA87C97599dB3  
  
'AuctionHouseProxiedV1'  
0x35659D74D0f5fDEB52FEB622Ebaa58932A4347f0  
  
'ERC2665ProxiedV1'  
0x60e31A1a38213Ec3Ba1C7345EA49C8b57f7bA4D7  
  
'CryptographKYCProxiedV1'  
0x5e542437C814E443AC5dd338dA6FDE5acc1a4aE6  
  
### Version Control Mapping  
  This is the current Mapping used by the Version Control, directing which version of the logic code is used by the smart contracts.     
Every address used in this mapping need to be approved by the Senate beforehand.   
  
  
[0] = 	0x9b49Cf5a091B313fA4AD1f8f3A4d6B325d76F502 is 'VersionControlLogicV1'  
[1] = 	0xD0453BDC61aDBd833e65f0B2Cb9720f99A9Ed6E2 is 'SenateLogicV1'  
[2] = 	0xF04C879F52e700874A170c4C4e45b453Bd8234c6 is 'CryptographFactoryLogicV1'  
[3] = 	0x42818e37383d9b31C29316780c8491ba0BF3Df57 is 'CryptographIndexLogicV1'  
[4] = 	0xf607014406bc3Fa7aAB224a85A0318b4556e9C28 is 'AuctionHouseLogicV1'  
[5] = 	0x0D5E41f858761537f2C7Ee8E25650F330C58161C is 'ERC2665LogicV1'  
[6] = 	0xfD6dBc7De22Eb28B8997275320f5F1ab89370788 is 'CryptographKYCLogicV1'  
[7] = 	0x1EEd26e3723Ff747C6ce374121c7fc29BDac3570 is 'SingleAuctionLogicV1'  
[8] = 	0x73d0E4Ed50f8ae11634273263F37C15Bd164eCe9 is 'SingleAuctionBidLogicV1'  
[9] = 	0xEB3F8Ed02E96dCd1EbE3f111B4F09FEfaDA20486 is 'TheCryptographLogicV1'  
[10] = 	0x48546182b90eD519b5A67DAc19894B9060a879ce is 'EditionIndexerLogicV1'  
[11] = 	0xBA0C786C8Ed053bDF235BD7726096079977a2a3C is 'MintingAuctionLogicV1'   
         
            
               
                
                
*Please be aware that the codebase is provided for transparency reasons, but that it's content is nonetheless protected by a proprietary license.*     
