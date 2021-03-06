# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

VehicleType.create({vehicle: 'Cars', status: 0, comments: ''})
Role.create([{role_name: 'Admin'}, {role_name: 'Vendor'}, {role_name: 'Buyer'}])
CarType.create([{name: 'New', status: 0, comments: ''}, {name:'Used', status: 0, comments: ''}])
CarTransmission.create([{name:'Manual', status: 0, comments: ''}, {name:'Automatic', status: 0, comments: ''}])