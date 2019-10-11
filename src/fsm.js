
class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.states = config.states;
        this.currentState = "normal";
        this.nextState = null;
        this.prevState = null;
        this.statesStack = [this.initial];
        this.pointer = 0; 
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }
    
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this.states){
            this.prevState = this.currentState;
            this.currentState = state;
            this.statesStack.splice(this.pointer, this.statesStack.length-1-this.pointer, this.currentState);
            this.pointer++ ;
            return state;
        }
        else {
            throw new Error('Error');
        }
        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(event in this.states[this.currentState].transitions){
            this.prevState = this.currentState;
            this.currentState = this.states[this.currentState].transitions[event];
            this.pointer++;
            this.statesStack.splice(this.pointer, this.statesStack.length-1-this.pointer , this.currentState);
            
        }
        else {
            throw new Error('Error');
        }
        

        


    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.initial);
        this.pointer = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let ArrayOfStates = [];
        if(event == undefined) {
            return Object.keys(this.states);
        } else {
            Object.keys(this.states).forEach(element => {
                if(event in this.states[element].transitions) { 
                    ArrayOfStates.push(element);
                }  
            }
            );
            return ArrayOfStates; 
        }
       
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.pointer == 0){
            return false;
        } else {
            this.nextState = this.statesStack[this.pointer];
            this.currentState = this.prevState;
            this.pointer-- ;
            if(this.pointer == 0){ 
                this.prevState = null;
            } else {            
                this.prevState = this.statesStack[this.pointer];
            }
            
            
            
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.pointer == this.statesStack.length-1){
            return false;
        } else {
            this.prevState = this.statesStack[this.pointer];
            this.currentState = this.nextState;
            this.pointer++ ;
            this.nextState = this.statesStack[this.pointer+1];  
            return true;
        }  
    }

    /**
     * Clears transition history
     */
    clearHistory() {
       this.currentState = "normal";
       this.nextState = null;
       this.prevState = null;
       this.pointer = 0;
       this.statesStack = [this.initial]; 
    }
}
 
module.exports = FSM;

/** @Created by Uladzimir Halushka **/
