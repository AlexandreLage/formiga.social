# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') #if Rails.env.development?


Post.create(
  title: "Assalto armado ao Banco do Brasil",
  description: "Eles tem fuzis e fizeram reféns.",
  post_type: "picture",
  date: Time.now.to_datetime,
  maps_marker: "",
  city: "São Paulo",
  state: "São Paulo",
  address1: "Av. Paulista",
  address2: "Jd. Paulista",
  number: 1573,
  issue_type: "Assalto, roubo",
  issue_solved: false
)

Post.create(
  title: "Cidadão em condição de rua sem agasalho",
  description: "Um senhor está desacordado sem agasalho e a noite está muito fria.",
  post_type: "picture",
  date: Time.now.to_datetime,
  maps_marker: "",
  city: "São Paulo",
  state: "São Paulo",
  address1: "Av. Paulista",
  address2: "Jd. Paulista",
  number: 1573,
  issue_type: "Cidadão em condição de rua",
  issue_solved: false
)
