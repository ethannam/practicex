class Instruction < ApplicationRecord
  enum instruction_type: [:test_day, :section]
end
