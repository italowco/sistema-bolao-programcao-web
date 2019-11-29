class ChangeRodadaToInteger < ActiveRecord::Migration[5.1]
  def change
    change_column :rodadas, :numero, :integer
  end
end
