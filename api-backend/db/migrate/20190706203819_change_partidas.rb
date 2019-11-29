class ChangePartidas < ActiveRecord::Migration[5.1]
  def change
    add_column :partidas, :resultado, :string
  end
end
