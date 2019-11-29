class AddFinalToRodada < ActiveRecord::Migration[5.1]
  def change
    add_column :rodadas, :finalizada, :bool
  end
end
