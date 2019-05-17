class TestSerializer < ActiveModel::Serializer
  attributes :id, :name, :version, :updates
  has_many :sections
end
