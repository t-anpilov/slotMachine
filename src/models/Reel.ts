export interface Reel {
    symbols: string[];
    position: number | null,
    spin() : void,
    display() : string
};

export class Reel {
    constructor() {
        //this.symbols = [ "X", "Y", "Z", "W", "$", "*", "<", "@"];  
        this.symbols = [ "9728", "9730", "9731", "9752", "9889", "9925", "9968", "9977"];
        this.position = null      
    }

    private randMax(max: number) {
        return Math.trunc(1E9 * Math.random()) % max;
    }

    spin() {
        if (this.position == null) {
            this.position = this.randMax( this.symbols.length );
        }
        /*this.position = (
            this.position + 100 + this.randMax(100)
        ) % this.symbols.length;*/
    }

    display() {
        if (this.position == null) {
            this.position = this.randMax( this.symbols.length );
        }
        return this.symbols[this.position];
    }

}