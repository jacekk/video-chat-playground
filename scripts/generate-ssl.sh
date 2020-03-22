#!/bin/bash

PROJECT_DIR=$(realpath "`dirname $0`/..")

SSL_ROOT="$PROJECT_DIR/ssl"
SSL_SUBJECT="/C=PL/ST=Lower Silesia/L=Wroclaw/O=JacekK Inc./OU=IT Crowd/CN=videochat-playground.local"

rm -rf $SSL_ROOT
mkdir $SSL_ROOT

openssl req \
	-keyout "$SSL_ROOT/temp.key" \
	-new \
	-nodes \
	-out "$SSL_ROOT/temp.cert" \
	-subj "$SSL_SUBJECT" \
	-x509

