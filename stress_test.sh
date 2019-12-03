#!/bin/bash

for i in $(eval echo {1..$1})
do
    sleep 1
    # pings local endpoint for agromashexpo.hu
    curl localhost:3001
    # pings local endpoint for automotivexpo.hu
    curl localhost:3002
    # pings local endpoint for autotechnika.hungexpo.hu
    curl localhost:3003
    # pings local endpoint for beautyandstyle.hu
    curl localhost:3004
    # pings local endpoint for boatshow.hu
    curl localhost:3005
    # pings local endpoint for construma.hu
    curl localhost:3006
    # pings local endpoint for fehova.hu
    curl localhost:3007
    # pings local endpoint for hungaromed.hu
    curl localhost:3008
    # pings local endpoint for hungarotherm.hu
    curl localhost:3009
    # pings local endpoint for iparnapjai.hu
    curl localhost:3010
    # pings local endpoint for motorfesztival.hu
    curl localhost:3011
    # pings local endpoint for osz.otthon-design.hu
    curl localhost:3012
    # pings local endpoint for otthon-design.hu
    curl localhost:3013
    # pings local endpoint for reneo.hu
    curl localhost:3014
    # pings local endpoint for sirha-budapest.com
    curl localhost:3015
    # pings local endpoint for utazas.hungexpo.hu
    curl localhost:3016
    # pings local endpoint for events.hungexpo.hu
    curl localhost:3101
    # pings local endpoint for rental.hungexpo.hu
    curl localhost:3102
done