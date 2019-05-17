# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_09_060834) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accommodations", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "instructions", force: :cascade do |t|
    t.integer "order"
    t.string "content"
    t.integer "time_cue"
    t.integer "instruction_type"
    t.boolean "giveBreak"
    t.integer "break_time"
    t.bigint "pace_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pace_id"], name: "index_instructions_on_pace_id"
  end

  create_table "paces", force: :cascade do |t|
    t.integer "total_time"
    t.bigint "section_id", null: false
    t.bigint "accommodation_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accommodation_id"], name: "index_paces_on_accommodation_id"
    t.index ["section_id"], name: "index_paces_on_section_id"
  end

  create_table "section_accommodations", force: :cascade do |t|
    t.bigint "accommodation_id", null: false
    t.bigint "section_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accommodation_id"], name: "index_section_accommodations_on_accommodation_id"
    t.index ["section_id"], name: "index_section_accommodations_on_section_id"
  end

  create_table "section_attempt_accommodations", force: :cascade do |t|
    t.bigint "section_attempt_id", null: false
    t.bigint "accommodation_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accommodation_id"], name: "index_section_attempt_accommodations_on_accommodation_id"
    t.index ["section_attempt_id"], name: "index_section_attempt_accommodations_on_section_attempt_id"
  end

  create_table "section_attempts", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "time_remaining"
    t.integer "time_over"
    t.bigint "section_id", null: false
    t.bigint "section_form_id"
    t.bigint "test_attempt_id", null: false
    t.bigint "next_section_attempt_id"
    t.bigint "pace_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["next_section_attempt_id"], name: "index_section_attempts_on_next_section_attempt_id"
    t.index ["pace_id"], name: "index_section_attempts_on_pace_id"
    t.index ["section_form_id"], name: "index_section_attempts_on_section_form_id"
    t.index ["section_id"], name: "index_section_attempts_on_section_id"
    t.index ["test_attempt_id"], name: "index_section_attempts_on_test_attempt_id"
  end

  create_table "section_forms", force: :cascade do |t|
    t.bigint "test_form_id", null: false
    t.bigint "section_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["section_id"], name: "index_section_forms_on_section_id"
    t.index ["test_form_id"], name: "index_section_forms_on_test_form_id"
  end

  create_table "sections", force: :cascade do |t|
    t.string "name"
    t.integer "order"
    t.integer "standard_time"
    t.integer "total_questions"
    t.string "version"
    t.string "updates"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "test_accommodations", force: :cascade do |t|
    t.bigint "test_id", null: false
    t.bigint "accommodation_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accommodation_id"], name: "index_test_accommodations_on_accommodation_id"
    t.index ["test_id"], name: "index_test_accommodations_on_test_id"
  end

  create_table "test_attempt_accommodations", force: :cascade do |t|
    t.bigint "test_attempt_id", null: false
    t.bigint "accommodation_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accommodation_id"], name: "index_test_attempt_accommodations_on_accommodation_id"
    t.index ["test_attempt_id"], name: "index_test_attempt_accommodations_on_test_attempt_id"
  end

  create_table "test_attempts", force: :cascade do |t|
    t.integer "attempt_type"
    t.datetime "start_date"
    t.datetime "end_date"
    t.bigint "test_id", null: false
    t.bigint "test_form_id"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["test_form_id"], name: "index_test_attempts_on_test_form_id"
    t.index ["test_id"], name: "index_test_attempts_on_test_id"
    t.index ["user_id"], name: "index_test_attempts_on_user_id"
  end

  create_table "test_forms", force: :cascade do |t|
    t.string "code"
    t.date "admin_date"
    t.integer "admin_region"
    t.string "admin_country"
    t.bigint "test_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["test_id"], name: "index_test_forms_on_test_id"
  end

  create_table "test_sections", force: :cascade do |t|
    t.bigint "test_id", null: false
    t.bigint "section_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["section_id"], name: "index_test_sections_on_section_id"
    t.index ["test_id"], name: "index_test_sections_on_test_id"
  end

  create_table "tests", force: :cascade do |t|
    t.string "name"
    t.string "version"
    t.string "updates"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "username"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.date "birthday"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "country"
    t.integer "sex"
    t.integer "grade"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "instructions", "paces"
  add_foreign_key "paces", "accommodations"
  add_foreign_key "paces", "sections"
  add_foreign_key "section_accommodations", "accommodations"
  add_foreign_key "section_accommodations", "sections"
  add_foreign_key "section_attempt_accommodations", "accommodations"
  add_foreign_key "section_attempt_accommodations", "section_attempts"
  add_foreign_key "section_attempts", "paces"
  add_foreign_key "section_attempts", "section_attempts", column: "next_section_attempt_id"
  add_foreign_key "section_attempts", "section_forms"
  add_foreign_key "section_attempts", "sections"
  add_foreign_key "section_attempts", "test_attempts"
  add_foreign_key "section_forms", "sections"
  add_foreign_key "section_forms", "test_forms"
  add_foreign_key "test_accommodations", "accommodations"
  add_foreign_key "test_accommodations", "tests"
  add_foreign_key "test_attempt_accommodations", "accommodations"
  add_foreign_key "test_attempt_accommodations", "test_attempts"
  add_foreign_key "test_attempts", "test_forms"
  add_foreign_key "test_attempts", "tests"
  add_foreign_key "test_attempts", "users"
  add_foreign_key "test_forms", "tests"
  add_foreign_key "test_sections", "sections"
  add_foreign_key "test_sections", "tests"
end
