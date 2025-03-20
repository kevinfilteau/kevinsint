# Task

Write a javascript application, running on the client side, to render a diagram of the patch cable in the provided Droid config file.

### What is Droid ?

In the DROID environment, circuits are like building blocks that handle control voltages (CV) to create and process signals. Here’s a simple summary of how they work together:

- **Inputs and Outputs**: Circuits have points (called jacks) where signals come in (inputs) and go out (outputs). You can connect these points to each other or to hardware like buttons and knobs.
- **Connections**: Circuits can get signals from hardware, fixed values, or other circuits. Their outputs can go to hardware (like LEDs or speakers) or feed into other circuits to make more complex setups.
- **What They Do**: Each circuit has a job—like mixing signals, creating sequences, making waveforms (like an LFO), shaping envelopes, or doing math (adding, subtracting, etc.).
- **Registers**: Inputs, outputs, LEDs, buttons, and knobs are all called "registers"—they’re the things circuits read from or write to.
- **How It Flows**: The DROID constantly loops: it reads inputs, processes them through circuits, and updates outputs.
- **Controllers**: You can hook up external devices (like sliders or buttons) to tweak circuits directly.
- **Patch Cables**: Virtual "cables" (with names starting with an underscore) link circuits internally, no physical wires needed.
- **Logic and Math**: Some circuits handle logic (AND, OR, etc.) for gate signals or do math on signals (like multiplying or dividing).
- **Matrix Mixing**: A special circuit can mix multiple inputs to multiple outputs, with buttons deciding what connects to what.

**Examples**:

1. An LFO circuit makes a square wave that triggers an envelope circuit via an internal cable. The envelope’s output then goes to a physical output.
2. A bernoulli circuit takes a trigger (from input G1) and randomly triggers an envelope, sending the result to output O1.
3. Circuits like motorfader or fadermatrix manage multiple sliders in one go, keeping things simple.

In short, circuits are like a team: they take signals, tweak them in specific ways, and pass them along to create whatever you’re designing!

### Requirements

Get inspiration from libraries like D3, markdown, mermaid or other you may know that better suit my needs. As of now, I like https://observablehq.com/@nitaku/tangled-tree-visualization-ii (Tangled) which have a subway map look.

I want the output cables to be joint together like for Trangled. Each circuit can be represented as a box and the cable as lines with a label on it.

- The app will use the Droid config file to build the diagram.

- Ignore input and outputs that are not connected to other circuits by a cable.
- Cables name always start with underscore character.
- The result will be output to the screen.
- Webpage, javascript, css etc... 
- List the name of the broken cables below the diagram.

## Layout

- The circuits are centered in the board.
- The space beween each circuit is the same.
- The circuit are presented one under another, vertically.

### Circuits

- Each circuit will be drawn as a box.
- The circuits are all the same size.
- The name of the circuit writen inside de box.
- Each outputs, and inputs name written near the side of the box, where the cable is connected.
- The cable name written on the line that represent the cable.

### Layout

- Prevent overlapping.
- Cable should start exactly where the circuit pin is, no in the middle of an edge of the box.
- Make cable always horizontal of vertical, no angles. Just add rounded 90 bend when necessary.
- Prefer a vertical layout, fit in a screen, scrollable.

### Tracks and lanes layout

- Tracks and lanes represent the path a cable takes to go from an input to an output.
- A track is the horizontal connection from an output or input pin to a lane.
- The lane represent a vertical connection besween two or more tracks.
- The tracks and lanes never pass over a circuit.
- A lane can't cross another lane.
- The lanes are always vertical.
- Lanes runs on both sides of a circuit.
- A track can cross over another track.
- A track can cross over a lane.
- The lanes and tracks path can't overlap.
- A track can be connected to only one downard lane.
- A track should be connected to only one upward lane.
- A track can be connected to one downward lane and one upward lane at the same time.
- A cable will run following the track and lane, always vertically and horizontally.



### Cables

- Consider multiple link from the same output as one cable that run from this output to the many other inputs.
- A cable that go from the ouput of a circuit to the input of another circuit that is below should run on the right of the circuits.
- A calbe that go from an ouput of a circuit to the input of anouther circuit that is over should run on the left side of the circuit.
- A cable can cross another cable.
- A cable must not run vertically or horizontally over another cable.
- A cable runs vertically to go to the side of the circuits
- A cable run horizontally to go to another circuit.
- A cable must not pass over a circuit.
- The distance between running cables should be contant and definable by a constant.




### Droid config file

```
# Kevin Sint SEQ 1.0.1

# Algoquencer + Minifonion based 16-step sequencer with random pitch
# Clock: I1
# Reset: I2
# Random Trigger: I3
# Energy: I4
# Morph I5
# Quantized Pitch CV: O1
# Gate/Trigger: O2
# Accent CV: O3

# INPUTS:
#  I1: [Clock]
#  I2: [Run/Reset]

# OUTPUTS:
#  O1: [Gate] Seq Gate
#  O2: [Note] Seq Gate
#  O3: [GCV] Grain CV
#  O4: [GT] Grain Clock

[e4]

# -------------------------------------------------
# Global
# -------------------------------------------------

# On Boot Trigger
[once]
    delay = 0.01
    trigger = _BOOT_TRIGGER

# Normalization register Input 1
[copy]
    input = 0
    output = N1

# CLOCK - Input
[copy]
    input = I1
    output = _CLOCK

# CLOCK - 12 / Bar (Triplets)
[clocktool]
    clock = _CLOCK
    reset = _RESET
    multiply = 3
    divide = 4
#   output = _CLOCK_12

# CLOCK - 1 / Bar
[clocktool]
    clock = _CLOCK
    delay = 0
    divide = 16
    reset = _RESET
    output = _CLOCK_BAR

# CLOCK - Swing
[timing]
    clock = _CLOCK
    reset = _RESET
    timing1 = 0
    timing2 = 0.1
    output = _CLOCK_SWING

# RESET - Run / Reset Input
[copy]
    input = I2
    output = _RESET

# Unconnected Outputs
[mixer]
    input4 = _POWER_INV
    input1 = _CLOCK_SWING

# RANDOM - 01 - 1..999999
[random]
    clock = _BOOT_TRIGGER
    minimum = 1
    steps = 999999
    maximum = 999999
    output = _RANDOM_01

# RANDOM - 02- 1..999999
[random]
    clock = _BOOT_TRIGGER
    minimum = 1
    steps = 999999
    maximum = 999999
    output = _RANDOM_02

# RANDOM - 03 - 1..999999
[random]
    clock = _BOOT_TRIGGER
    minimum = 1
    steps = 999999
    maximum = 999999
    output = _RANDOM_03

# RANDOM - 04 - 1..999999
[random]
    clock = _BOOT_TRIGGER
    minimum = 1
    steps = 999999
    maximum = 999999
    output = _RANDOM_04

# -------------------------------------------------
# Navigation
# -------------------------------------------------

# -------------------------------------------------
# Settings
# -------------------------------------------------

# SETTINGS-MODE - Encoder 4 button.
[logic]
    input1 = _DRUM_E4_BTN
    input2 = _SEQ_CHAOS_BTN
    input3 = _SETTINGS_MODE_BTN
    or = _MODE_SELECT_BTN

# SETTINGS-MODE - Pressing encoder 4 in all modes enters settings mode.
[button]
    dontsave = 1
    button = _MODE_SELECT_BTN
    output = _MODE_SELECT_ACTIVE

# SETTINGS-MODE
[encoder]
    color = 0.8
    discrete = 2
    encoder = E1.4
    select = _MODE_SELECT_ACTIVE
    startvalue = 0
    button = _SETTINGS_MODE_BTN
    output = _MODE_SELECT_POS

[copy]
    input = _MODE_SELECT_ACTIVE * 10000 + _MODE_SELECT_POS
    output = _MODE_SELECT_POS_E4

# -------------------------------------------------
# SEQ
# -------------------------------------------------

# SEQ - Progression Input
[copy]
    input = I6
    output = _RECORD_INPUT

# SEQ - Progression Record Led
[copy]
    input = I5
    output = R6

# SEQ - Progression
[logic]
    input1 = _RECORD_INPUT
    negated = _RECORD_INPUT_NOT

# SEQ - Recorder Trigger
#
# When record gate is high, the play trigger is ignored. When turning record gate to low, the next play trigger will stop recording and start playing.
[logic]
    input1 = _CLOCK_BAR
    input2 = _RECORD_INPUT_NOT
    threshold = 0.1
    and = _PROGRESSION_PLAY

# SEQ-PARAM - Change selected parameter (merge buttons)
[logic]
    input1 = _EC1A_BTN
    input2 = _EC1B_BTN
    input3 = _EC1C_BTN
    or = _EC1_BTN

# SEQ-PARAM - Change selected parameter (length, notes, undefined).
[button]
    button = _EC1_BTN
    states = 3
    output = _SEQ_PARAM_SELECT

# SEQ-PARAM-LENGTH - Sequence length.
[encoder]
    color = 0.2 # cyan
    discrete = 10
    encoder = E1.1
    select = _MODE_SELECT_POS * 100 + _SEQ_PARAM_SELECT
    selectat = 0
    button = _EC1A_BTN
    output = _EC1A

# SEQ-PARAM-RANDOM
[switch]
    input1 = _RANDOM_01
    input2 = _RANDOM_02
    input3 = _RANDOM_03
    input4 = _RANDOM_04
    offset = _SEQ_PARAM_PATTERN
    output1 = _SELECTED_RANDOM

# SEQ-PARAM-LENGTH - Sequence lengths choices.
[switch]
    input1 = 2
    input2 = 4
    input3 = 8
    input4 = 16
    input5 = 32
    input6 = 64
    input7 = 24
    input8 = 12
    input9 = 6
    input10 = 3
    offset = _EC1A
    output1 = _SEQ_LENGTH

# SEQ-PARAM-SCALE
[encoder]
    color = 0.3 # magenta
    discrete = 8
    encoder = E1.1
    select = _MODE_SELECT_POS * 100 + _SEQ_PARAM_SELECT
    selectat = 1
    button = _EC1B_BTN
    output = _EC1B

# SEQ-PARAM-PATTERN
[encoder]
    color = 0.4 # magenta
    discrete = 4
    encoder = E1.1
    select = _MODE_SELECT_POS * 100 + _SEQ_PARAM_SELECT
    selectat = 2
    button = _EC1C_BTN
    output = _SEQ_PARAM_PATTERN

# SEQ-POWER - 2nd knob
[encoder]
    color = 0.2 # cyan
    encoder = E1.2
    select = _MODE_SELECT_POS * 100
    selectat = 0
#   button = _EC2A_BTN
    output = _EC2A # 0..1

# SEQ-POWER - Output - Encoder + CV Input 4
[mixer]
    input1 = _EC2A
    input2 = I4
    output = _POWER

# SEQ-POWER - Output Inverted
[copy]
    input = -1 * _POWER + 1
    output = _POWER_INV

# SEQ-POWER - Rolls
[compare]
    compare = 0.9
    else = 0
    ifgreater = _POWER * 0.1
    input = _POWER
    output = _POWER_ROLLS

# SEQ-POWER - Gate Length
[crossfader]
    fade = _POWER
    input1 = 0.3
    input2 = 0.5
    input3 = 2
    input4 = 1
    input5 = 0.7
    input6 = 0.5
    input7 = 0.25
    input8 = 0.1
    output = _POWER_GATE

# SEQ-POWER - Pitch Range
[switch]
    input1 = 1 * 0.1
    input2 = 1 * 0.1
    input3 = 1 * 0.1
    input4 = 2 * 0.1
    input5 = 2 * 0.1
    input6 = 2 * 0.1
    input7 = 2 * 0.1
    input8 = 2 * 0.1
    input9 = 3 * 0.1
    input10 = 3 * 0.1
    input11 = 2 * 0.1
    input12 = 1 * 0.1
    offset = _POWER * 10
    output1 = _PITCH_RANGE

# SEQ-DEPTH - 3rd knob
[encoder]
    color = 0.2 # cyan
    encoder = E1.3
    select = 0
    selectat = _MODE_SELECT_POS * 100
#   button = _EC3A_BTN
    output = _EC3A

# SEQ-DEPTH - Output
[mixer]
    input1 = _EC3A
    output = _DEPTH

# SEQ-DEPTH - Output 0..3 for Branches
[math]
    input1 = _DEPTH * 3
    round = _DEPTH_BRANCHES

# SEQ-CHAOS - 4th knob - Mode A
[encoder]
    color = 0.2 # cyan
    encoder = E1.4
    select = 0
    selectat = _MODE_SELECT_POS_E4 * 100
    button = _SEQ_CHAOS_BTN
    output = _EC4A

# SEQ-CHAOS - Mixer
[mixer]
    input1 = _EC4A
    output = _CHAOS

# SEQ-CHAOS - Ouput Inverted
[copy]
    input = -1 * _CHAOS + 1
    output = _CHAOS_INV

# SEQ - Progression
[recorder]
    clock = _CLOCK
    cvin = I5
    playbutton = _PROGRESSION_PLAY
    recordbutton = _RECORD_INPUT
    cvout = _PROGRESSION_OUT
    recordled = R6

# SEQ - Sequencer
[algoquencer]
    pattern = _SELECTED_RANDOM * 1000
    activity = _POWER
    branches = _DEPTH_BRANCHES
    clock = _CLOCK
    dejavu = _CHAOS_INV * 0.5 + 0.5 # Keep the random pattern repeating (like a Turing machine)
    gatelength = _POWER_GATE
    length = _SEQ_LENGTH # 2,4,8,16
    morphs = _CHAOS
    pitchhigh = _PITCH_RANGE
    pitchlow = 0
    reset = _RESET
    rolls = _POWER_ROLLS
    variation = _CHAOS * 0.5 # No additional variation yet
    gate = _SEQ_GATE
    pitch = _RAW_PITCH # Raw CV to be quantized

# SEQ - Progression Pitch Mix
[mixer]
    input1 = _RAW_PITCH
    input2 = _PROGRESSION_OUT * 0.2 - 0.2
    output = _RAW_PITCH_MIX

# SEQ - Output
[copy]
    input = _SEQ_GATE
    output = O1

# SEQ - Quantizer
[minifonion]
    degree = 7 # Minor
    harmonicshift = _EC1B
    input = _RAW_PITCH_MIX # Take raw CV from algoquencer
    root = 0 # Root note D
    trigger = _SEQ_GATE
    output = O2 # Output quantized CV

# -------------------------------------------------
# Grain
# -------------------------------------------------

# GRAIN-PARAM-CLOCK - Clock Multipliyer
[encoder]
    notch = 0.05
    mode = 2
    startvalue = 0
    color = 0.4 # Green
    negativecolor = 0.73 # Orange
    encoder = E1.1
    select = _MODE_SELECT_POS * 100
    selectat = 100
    output = _GRAIN_CTRL

# GRAIN-LOOP-CLK
[switch]
    input1 = 0
    input2 = 0.0625
    input3 = 0.125
    input4 = 0.25
    input5 = 0.5
    input6 = 1
    input7 = 2
    input8 = 4
    input9 = 8
    input10 = 16
    input11 = 32
    offset = _GRAIN_CTRL * -11
    output1 = _GRAIN_CTRL_DIV

[compare]
    input = _GRAIN_CTRL
    compare = 0
    ifgreater = 1
    ifless = 2
    ifequal = 0
    output = _GRAIN_MODE

# GRAIN-CLK-LOOP
[select]
    input = _GRAIN_CTRL_DIV
    select = _GRAIN_MODE
    selectat = 2
    output = _GRAIN_CLK_DIV

# GRAIN-CLK-GRANULAR
[select]
    input = _GRAIN_CTRL
    select = _GRAIN_MODE
    selectat = 1
    output = _GRAIN_CLK_MULT

[clocktool]
    dutycycle = 0.1
    clock = _CLOCK
    reset = _RESET
    divide = _GRAIN_CLK_DIV
    multiply = _GRAIN_CLK_MULT * 32 + 0
    delay = 0
    output = _GRAIN_TRIG

[bernoulli]
    input = _GRAIN_TRIG
    distribution = _GRAIN_CTRL * 2 # Values over 1 and below 0 are ignored.
    output1 = _GRAIN_TRIG_MULT

[mixer]
    input1 = _GRAIN_TRIG_LOOP
    input2 = _GRAIN_TRIG_GRANULAR
    output = _GRAIN_TRIG

[random]
    clock = _GRAIN_TRIG
    minimum = 0
    maximum = 1
    output = _GRAIN_RANDOM

[cvlooper]
    gatein = _GRAIN_TRIG
    cvin = _GRAIN_RANDOM
    clock = _CLOCK * 0.5
    reset = _RESET
    length = 16
    loopswitch = I3
    cvout = _GRAIN_CV_OUT
    gateout = _GRAIN_TRIG_OUT

# DRUM-E4
[encoder]
    color = 0.4
    encoder = E1.4
    select = _MODE_SELECT_POS_E4 * 100
    selectat = 100
    button = _DRUM_E4_BTN

[copy]
    input = _GRAIN_CV_OUT * 0.1
    output = O3

[copy]
    input = _GRAIN_TRIG_OUT
    output = O4

```

