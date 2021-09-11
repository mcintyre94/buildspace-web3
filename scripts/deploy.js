async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account: ", deployer.address);
    const balance = (await deployer.getBalance()).toString();
    console.log("Account balance: ", balance);

    const Token = await ethers.getContractFactory("WavePortal");
    const token = await Token.deploy();
    await token.deployed();

    console.log("WavePortal address: ", token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });