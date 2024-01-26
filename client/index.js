const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // Get the root
  const root = merkleTree.getRoot();

  // Find the proof that name is in the list
  const name = "Andre DeCarlo";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {name, proof});

  console.log({ gift });
}

main();