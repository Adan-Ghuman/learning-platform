# Learning Platform API (Backend)

This is the backend API for the Learning Platform, built with Ruby on Rails.

## Prerequisites
* Ruby (as specified in Gemfile)
* Bundler
* SQLite3

## Setup Instructions

1. Navigate to the backend directory:
   cd learning_platform_be
2. Install dependencies:
   bundle install
3. Setup the database (creates db, loads schema, and seeds data):
   rails db:setup
4. Start the Rails server:
   rails server

The API will be available at http://localhost:3000.

## Running Tests
To run the RSpec test suite:
bundle exec rspec
