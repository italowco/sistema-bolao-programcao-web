# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Todos os times da serie A
teams = Team.create([
                        {
                            name: "Corinthians",
                            escudo: "../assets/times/corinthians.svg",
                            sigla: "COR",
                            divisao: 'a'
                        },
                        { name: "Flamengo",
                          escudo: "../assets/times/Flamengo.svg",
                          sigla: "FLA",
                          divisao: 'a'
                        },
                        { name: "CSA",
                          escudo: "../assets/times/csa.svg",
                          sigla: "CSA",
                          divisao: 'a'
                        },
                        { name: "Vasco",
                          escudo: "../assets/times/vasco.svg",
                          sigla: "VSC",
                          divisao: 'a'
                        },
                        { name: "Atletico Mineiro",
                          escudo: "../assets/times/atletico-mg.svg",
                          sigla: "CAM",
                          divisao: 'a'
                        },
                        { name: "Avai",
                          escudo: "../assets/times/avai-futebol-clube.svg",
                          sigla: "AVA",
                          divisao: 'a'
                        },
                        { name: "Chapecoense",
                          escudo: "../assets/times/chapecoense.svg",
                          sigla: "CHA",
                          divisao: 'a'
                        },{
                          name: "Atletico Paranaense",
                          escudo: "../assets/times/Athletico_Paranaense.svg",
                          sigla: "CAP",
                          divisao: 'a'
                        },
                        {
                          name: "Bahia",
                          escudo: "../assets/times/bahia.svg",
                          sigla: "BAH",
                          divisao: 'a'
                        },
                        {
                          name: "Grêmio",
                          escudo: "../assets/times/gre.svg",
                          sigla: "GRE",
                          divisao: 'a'
                        },
                        {
                          name: "Palmeiras",
                          escudo: "../assets/times/palmeiras.svg",
                          sigla: "PAL",
                          divisao: 'a'
                        },
                        {
                          name: "Internacional",
                          escudo: "../assets/times/internacional.svg",
                          sigla: "INT",
                          divisao: 'a'
                        },
                        {
                          name: "Botafogo",
                          escudo: "../assets/times/botafogo.svg",
                          sigla: "BOT",
                          divisao: 'a'
                        },
                        {
                          name: "Ceará",
                          escudo: "../assets/times/ceara.svg",
                          sigla: "CEA",
                          divisao: 'a'
                        },
                        {
                          name: "Fluminense",
                          escudo: "../assets/times/fluminense.svg",
                          sigla: "FLU",
                          divisao: 'a'
                        },
                        {
                            name: "Cruzeiro",
                            escudo: "../assets/times/cruzeiro.svg",
                            sigla: "CRU",
                            divisao: 'a'
                        },
                        {
                          name: "Goiás",
                          escudo: "../assets/times/Goias_SVG.svg",
                          sigla: "GOI",
                          divisao: 'a'
                        },
                        {
                          name: "Fortaleza",
                            escudo: "../assets/times/optimised.svg",
                          sigla: "FOR",
                          divisao: 'a'
                        },
                        {
                          name: "São Paulo",
                          escudo: "../assets/times/sao-paulo.svg",
                          sigla: "SAO",
                          divisao: 'a'
                        },
                        {
                          name: "Santos",
                          escudo: "../assets/times/santos.svg",
                          sigla: "SAN",
                          divisao: 'a'
                        }])

#Team.create({name: "Corinthians",escudo: "../assets/times/corinthians.svg", sigla: "COR"})