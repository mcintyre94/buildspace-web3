async function main() {
    const [_, randoPerson] = await ethers.getSigners()

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});
    await waveContract.deployed();
    console.log("Contract deployed to: ", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    let waveCount = await waveContract.getTotalWaves();
    console.log("Wave count: ", waveCount.toNumber());

    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randoPerson).wave("Another message!");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    const randoBalance = await hre.ethers.provider.getBalance(randoPerson.address);
    console.log("Rando balance: ", hre.ethers.utils.formatEther(randoBalance));

    const allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    waveTxn = await waveContract.connect(randoPerson).wave("Another message!");
    await waveTxn.wait();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });