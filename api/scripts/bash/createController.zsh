#!/bin/bash

echo "Whats the name of the controller?"
read -r -e -p "Name = " name_var
export CONTROLLER_NAME=$name_var

nest g controller $CONTROLLER_NAME controllers
