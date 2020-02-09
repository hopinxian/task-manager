# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#seed data for uncompleted tasks
9.times do |i|
  Task.create(
      title: "Task #{i + 1}",
      description: 'Sample description.',
      deadline: DateTime.new(2022,9,1,17),
      tag: 'red',
      completed: false
  )
end

#seed data for completed tasks
9.times do |i|
  Task.create(
      title: "Task #{i + 10}",
      description: 'Sample description.',
      deadline: DateTime.new(2022,9,1,17),
      tag: 'red',
      completed: true
  )
end
