# Wallnut

Stick your note to the wall, observe other notes appearing.

## Frontend

## Backend

Think of KeyDB

On initial load fetch contents of current window.

at first i thought of creating 16bit x 16bit grid e.g. ~ 4 billion distinct cells, this still would allow to specify position (x,y) as single integer, as x being most significant bits and y being less significant so (-1000, 725) would be represented by 0b 1111 1111 1110 1000 | 0000 0010 1101 0101. Later on i thought realistically and changed it to 8bit x 8bit as it's still large amount of data
