# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190912165256) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "aposta_folhas", force: :cascade do |t|
    t.integer "partida_id"
    t.integer "rodada_id"
    t.string "numero"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_aposta_folhas_on_user_id"
  end

  create_table "bilhetes", force: :cascade do |t|
    t.integer "rodada_id"
    t.integer "partida_id"
    t.integer "numero"
    t.string "resultado"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "aposta_folha_id"
    t.index ["aposta_folha_id"], name: "index_bilhetes_on_aposta_folha_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "partidas", force: :cascade do |t|
    t.integer "visitante_id"
    t.integer "mandante_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "rodada_id"
    t.string "resultado"
    t.index ["rodada_id"], name: "index_partidas_on_rodada_id"
  end

  create_table "resultados", force: :cascade do |t|
    t.integer "rodada_id"
    t.integer "partida_id"
    t.string "resultado"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rodadas", force: :cascade do |t|
    t.integer "numero"
    t.decimal "valor"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "data_fim"
    t.string "divisao"
    t.integer "valor_bilhete"
    t.boolean "finalizada"
    t.decimal "lucro"
    t.decimal "comissao"
  end

  create_table "teams", force: :cascade do |t|
    t.string "sigla"
    t.string "name"
    t.string "escudo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "divisao"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "profile"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "aposta_folhas", "users"
  add_foreign_key "bilhetes", "aposta_folhas"
  add_foreign_key "partidas", "rodadas"
end
