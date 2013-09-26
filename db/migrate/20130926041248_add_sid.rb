class AddSid < ActiveRecord::Migration
  def up
    add_column :diagramparts, :sysid, :integer
    execute "CREATE SEQUENCE diagrampart_sysid_seq"
    execute "UPDATE diagramparts SET sysid=nextval('diagrampart_sysid_seq');"
  end
end
