# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Activity.destroy_all
Trip.destroy_all
User.destroy_all

states = 
['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

tripTypes = ["ski", "beach", "hiking", "city", "international"]
activityTypes = ["outdoor", "indoor"]

trueOrFalse = [true, false]

puts "Seeding Users!"

anna = User.create(name: 'Anna', username: 'anna1697', password: 'Huxley217!', bio: 'finish your bio!')
mike = User.create(name: 'Mike', username: 'mike217', password: 'Huxley217!', bio: 'finish your bio!')
huxley = User.create(name: 'Huxley', username: 'Huxley69', password: 'Huxley217!', bio: 'finish your bio!')

puts "Seeding Trips!"
30.times do
    Trip.create(name: "#{tripTypes.sample} Trip", location: states.sample, date: "12/2019", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam justo, scelerisque non felis porta, placerat vestibulum nisi. Vestibulum ac elementum massa. ", private: trueOrFalse.sample, user_id: User.all.sample.id )
end

puts "Seeding Activities 🌶!"
30.times do
    Activity.create(title: "Another Activity", activity_type: activityTypes.sample, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam justo, scelerisque non felis porta, placerat vestibulum nisi. Vestibulum ac elementum massa. In rutrum quis risus quis sollicitudin.", trip_id: Trip.all.sample.id )
end

puts "done seeding! ✅"

