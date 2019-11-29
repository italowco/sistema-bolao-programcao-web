class CreateRodadas < ActiveRecord::Migration[5.1]
  def change
    create_table :rodadas do |t|
      t.decimal :numero
      t.decimal :valor

      t.timestamps
    end
  end
end
