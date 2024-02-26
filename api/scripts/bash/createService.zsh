#!/bin/bash

echo "Whats the name of the service?"
read -r -e -p "Name = " name_var
export SERVICE_NAME=$name_var

nest g service $SERVICE_NAME services
