import { ethers, network } from "hardhat"
const color = require("cli-color")
const msg = color.xterm(39).bgXterm(128)

function formatBlockDate(date) {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }
    return date.toLocaleString("en-US", options)
}

async function main() {
    console.log("\nListening to", msg(network.name) + "...")

    ethers.provider.on("block", async blockNumber => {
        try {
            const block = await ethers.provider.getBlock(blockNumber)

            if (block) {
                const bts = block.timestamp
                const numTransactions = block.transactions.length
                const blockDate = new Date(bts * 1000)
                const formattedDate = formatBlockDate(blockDate)

                console.log(
                    `\nBlock ${msg(blockNumber)} was mined on ${msg(
                        formattedDate
                    )}. There were ${msg(
                        numTransactions
                    )} transactions in this block.`
                )
            } else {
                console.log(`\nBlock ${msg(blockNumber)} not found.`)
            }
        } catch (error) {
            console.error(`Error processing block ${blockNumber}: ${error}`)
        }
    })
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
