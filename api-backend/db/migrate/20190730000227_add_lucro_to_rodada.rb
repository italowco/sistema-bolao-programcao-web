class AddLucroToRodada < ActiveRecord::Migration[5.1]
  def change
    add_column :rodadas, :lucro, :decimal
  end
end
