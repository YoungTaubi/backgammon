import { User } from "@/lib/features/userSlice";
import * as Colyseus from "colyseus.js";
import { Room, Client } from "colyseus.js";
import { store } from "@/lib/store";
// import { updateUser, setTest } from "@/lib/features/user/userSlice"

type Probs = {
    name: string,
    Id: string
}

export default class MultiPlayer {
    private client: Colyseus.Client;
    private room: any; // To-Do: add type
    private playerEntities: { [sessionId: string]: any } = {}; // To-Do: add type
    private userName: string;
    private userId: string;

    constructor({ name, Id }: Probs) {
        console.log("hello from Multiplayer");
        // this.client = new Colyseus.Client('https://multiplayergamempe.onrender.com/');
        this.client = new Colyseus.Client('http://localhost:2567');
        this.userName = name;
        this.userId = Id;
        this.create();
    }

    async create() {

        // connect with the room
        await this.connect();

        this.room.state.players.onAdd((player: any, sessionId: string) => {
            const entity = { userName: player.name, id: player.id };
            console.log("enitiysays hello", entity);
            this.playerEntities[sessionId] = entity;
            setTimeout(() => {
                Object.values(this.playerEntities).forEach(entity => {
                // store.dispatch(updateUser({ userId: entity.id, isOnline: true }));
            })
            }, 100)
            
            
            // store.dispatch(setTest({ test: player.name }));


            // listening for server updates
            player.onChange(() => {

                // 
                // update local position immediately
                // (WE WILL CHANGE THIS ON PART 2)
                //
                // entity.x = player.x;
                // entity.y = player.y;
            });
        });

        // remove local reference when entity is removed from the server
        this.room.state.players.onRemove((player: User, sessionId: string) => {
            const entity = this.playerEntities[sessionId];
            if (entity) {
                delete this.playerEntities[sessionId]
            }
        });
    }

    async connect() {
        const options = {
            name: this.userName,
            id: this.userId
        }
        try {
            this.room = await this.client.joinOrCreate("my_room", options);
            console.log(this.room.sessionId, "joined", this.room.name, "room: ", this.room);
        } catch (e) {
            // couldn't connect
            console.error("Could not connect with the server.");;
        }

    }

    update(time: number, delta: number): void {
        // skip loop if not connected with room yet.
        if (!this.room) {
            return;
        }

        // send input to the server
        // this.inputPayload.left = this.cursorKeys.left.isDown;
        // this.inputPayload.right = this.cursorKeys.right.isDown;
        // this.inputPayload.up = this.cursorKeys.up.isDown;
        // this.inputPayload.down = this.cursorKeys.down.isDown;
        // this.room.send(0, this.inputPayload);
    }


    private load() {
        // console.log("loading multiplayer", this.client);
        // this.client.joinOrCreate("my_room").then(room => {
        //     console.log(room.sessionId, "joined", room.name);
        // }).catch(e => {
        //     console.log("JOIN ERROR", e);
        // });
    }

    private unload() {
        //To-Do: unload multiplayer
    }
}