import { useEffect, useState, FormEvent } from 'react';

import { Check, GameController } from 'phosphor-react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';

import { Input } from '../form/input';
import { Game } from '../App';
import axios from 'axios';




export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setuseVoiceChannel] = useState(false);

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data);
        })
    }, []);

    async function handleCrearAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data.name) {
            return
        }
        console.log();

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                id: data.game,
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            });

            alert("Anuncio criado com sucesso");
        } catch (error) {
            alert("Erro ao criar o anúncio");
            console.log(error);
        }


    }


    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 overflow-hidden">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>


                <form onSubmit={handleCrearAd} className="mt-8 flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game ?</label>
                        <select id="game"
                            name="game"
                            defaultValue=""
                            className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none placeholder:text-zinc-500">
                            <option disabled value="">Selecione o que você quer jogar</option>
                            {games.map(game => {
                                return (
                                    <option key={game.id} value={game.id}>{game.title}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Seu nome (ou nickename) </label>
                        <Input required name="name" id="name" type="text" placeholder="Como te chamam dentro do jogo?" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
                            <Input required name="yearsPlaying" id="yearsPlaying" className="font-semibold" type="text" placeholder="Tudo bem ser ZERO" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord" className="font-semibold"> Qual o seu Discord?</label>
                            <Input name="discord" id="discord" type="text" placeholder="Usuário#000" required />
                        </div>
                    </div>


                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jgoar?</label>
                            <ToggleGroup.Root
                                type="multiple"
                                className="grid grid-cols-4 gap-2"
                                value={weekDays}
                                onValueChange={setWeekDays}>
                                <ToggleGroup.Item value="0"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title="Domingo">D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value="1"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title="Segunda">S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value="2"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title="Terça">T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value="3"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title="Quarta">Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value="4"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title="Quinta">Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value="5"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title="Sexta">S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item value="6"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title="Sábado">S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>


                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="hourStart" id="hourStart" type="time" placeholder="De" required />
                                <Input name="hourEnd" id="hourEnd" type="time" placeholder="De" required />
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked == true) {
                                    setuseVoiceChannel(true)
                                } else {
                                    setuseVoiceChannel(false)
                                }
                            }}>
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>


                    <footer className="mt-4 flex justify-end gap-4">
                        <button type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</button>
                        <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                            <GameController className="w-6 h-6" />
                            Encontar DUO
                        </button>
                    </footer>


                </form>


            </Dialog.Content>
        </Dialog.Portal>
    )
}