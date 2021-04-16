# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_16_202438) do

  create_table "car_bodies", charset: "utf8mb4", force: :cascade do |t|
    t.string "type_name"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "car_colours", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "car_makes", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "car_models", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "make_id"
  end

  create_table "car_transmissions", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "car_types", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "cars", charset: "utf8mb4", force: :cascade do |t|
    t.string "car_name"
    t.integer "car_type_id"
    t.string "car_registration_number"
    t.datetime "car_registration_first_date"
    t.float "car_price"
    t.integer "fuel_type_id"
    t.float "mileage"
    t.integer "colour_id"
    t.integer "body_type_id"
    t.text "description"
    t.integer "transmission_type_id"
    t.string "trim_details"
    t.string "derivative_details"
    t.integer "make_id"
    t.integer "model_id"
    t.string "variant_details"
    t.integer "seats"
    t.integer "doors"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "fuel_types", charset: "utf8mb4", force: :cascade do |t|
    t.string "fuel_type"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
