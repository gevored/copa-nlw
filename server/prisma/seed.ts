import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'john',
            email: 'john2hmail.com',
            avatarUrl :'http://github.com/diego3g.png'
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title: 'Match new',
            code: 'bool123',
            ownerId:user.id, 

            participants:{
                create:{
                    userId : user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date: "2022-11-30T12:19:24.312Z",
            firstTeamCountryCode:'DE',
            seconndTeamCountryCode: 'BR'
        }
    })


    await prisma.game.create({
        data:{
            date: "2022-11-21T12:19:24.312Z",
            firstTeamCountryCode:'BR',
            seconndTeamCountryCode: 'AR',
            guesses:{
                create:{
                    firstTeamPoints:2,
                    secondTeamPoint:1,

                    Participant:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId:pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()