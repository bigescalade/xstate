import { createMachine } from 'xstate'
import { useMachine } from "@xstate/react"

const pedestrianStates = {
	initial: 'walk',
	states: {
		walk: {
			on: {
				PED_TIMER: 'stop'
			},
		},
		stop: {},
	}
}

const lightMachine = createMachine({
  key: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow'
      }
    },
    yellow: {
      on: {
        TIMER: 'red'
      }
    },
    red: {
      on: {
        TIMER: 'green'
      },
      ...pedestrianStates
    }
  },
})

function App() {
  const [current, send] = useMachine(lightMachine);
	
  const red = current.matches('red')
  const yellow = current.matches('yellow')
	const green = current.matches('green')

	const walk = current.matches('red.walk')

  return (
    <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}}>
			<a href="https://xstate.js.org/viz/?gist=63bf437c22c85fe9a043eb5bc5d80176">Visualization Chart</a>
			<div style={{padding: 50}}>
				<button onClick={() => {
					if (red && walk) {
						send('PED_TIMER')
					} else {
						send('TIMER')
					}
				}}>TOGGLE STATE</button>
			</div>
			<p>Traffic Light</p>
			<div style={{alignItems: 'center', backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 100, width: 50}}>
				{red ? <div style={{backgroundColor: 'red', height: 20, width: 20}} /> : <div style={{height: 20, width: 20}} />}
				{yellow ? <div style={{backgroundColor: 'yellow', height: 20, width: 20}} /> : <div style={{height: 20, width: 20}} />}
				{green ? <div style={{backgroundColor: 'green', height: 20, width: 20}} /> : <div style={{height: 20, width: 20}} />}
			</div>
			<div style={{padding: 20}} />
			<p>Pedestrian Light</p>
			<div style={{alignItems: 'center', backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 75, width: 50}}>
				{!walk ? <div style={{backgroundColor: 'red', height: 20, width: 20}} /> : <div style={{height: 20, width: 20}} />}
				{walk ? <div style={{backgroundColor: 'green', height: 20, width: 20}} /> : <div style={{height: 20, width: 20}} />}
			</div>
    </div>
  );
}

export default App;
