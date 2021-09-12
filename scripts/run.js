async function main() {
    const [_, randoPerson] = await ethers.getSigners()

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to: ", waveContract.address);

    let waveCount = await waveContract.getTotalWaves();
    console.log("Wave count: ", waveCount.toNumber());

    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randoPerson).wave("Another message!");
    await waveTxn.wait();

    const allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });