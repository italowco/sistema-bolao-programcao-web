class AddDataToRodada < ActiveRecord::Migration[5.1]
  def change
    add_column :rodadas, :data_fim, :datetime
    add_column :rodadas, :divisao, :string
  end
end
