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

ActiveRecord::Schema.define(version: 2021_04_30_214034) do

  create_table "active_storage_attachments", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

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

  create_table "car_cylinders", charset: "utf8mb4", force: :cascade do |t|
    t.integer "cylinder"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "comments"
    t.boolean "status"
  end

  create_table "car_documents", charset: "utf8mb4", force: :cascade do |t|
    t.string "doc_type"
    t.boolean "doc_valid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "comments"
    t.boolean "status"
  end

  create_table "car_drives", charset: "utf8mb4", force: :cascade do |t|
    t.string "drive_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "status"
    t.text "comments"
  end

  create_table "car_engines", charset: "utf8mb4", force: :cascade do |t|
    t.string "engine_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "status"
    t.text "comments"
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
    t.integer "model_date"
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
    t.string "car_primary_damage"
    t.string "car_secondary_damage"
    t.float "estimated_retail_price"
    t.boolean "car_keys"
    t.integer "drive_type"
    t.integer "car_cylinder"
    t.integer "car_doc_id"
    t.string "car_highlights"
    t.integer "car_model_year"
    t.integer "car_engine_id"
    t.integer "vehicle_type_id"
    t.integer "car_user_id"
  end

  create_table "fuel_types", charset: "utf8mb4", force: :cascade do |t|
    t.string "fuel_type"
    t.boolean "status"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "roles", charset: "utf8mb4", force: :cascade do |t|
    t.string "role_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "email"
    t.string "encrypted_password"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count"
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "mobile_number"
    t.integer "role_id"
    t.boolean "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "firstname"
    t.string "othernames"
    t.string "username"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "vehicle_types", charset: "utf8mb4", force: :cascade do |t|
    t.string "vehicle"
    t.text "comments"
    t.boolean "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "vehicleenquiries", charset: "utf8mb4", force: :cascade do |t|
    t.string "firstname"
    t.string "lastname"
    t.string "email"
    t.string "phonenumber"
    t.string "message"
    t.boolean "status"
    t.integer "enquirer_user_id"
    t.integer "vehicle_user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
