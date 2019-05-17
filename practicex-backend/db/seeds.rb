SectionForm.destroy_all
TestForm.destroy_all
SectionAttempt.destroy_all
TestAttempt.destroy_all
User.destroy_all
TestSection.destroy_all
Section.destroy_all
Test.destroy_all
ActiveRecord::Base.connection.execute("ALTER SEQUENCE tests_id_seq RESTART;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE sections_id_seq RESTART;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE test_sections_id_seq RESTART;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE users_id_seq RESTART;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE test_attempts_id_seq RESTART;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE section_attempts_id_seq RESTART;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE test_forms_id_seq RESTART;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE section_forms_id_seq RESTART;")

act = Test.create(name: "ACT", version: "2015", updates: "Redesigned essay section")
sat = Test.create(name: "SAT", version: "2016", updates: "Returned to 1600-point scale, redesigned entire test")
# Test.create(name: "SAT", version: "2005", updates: "Introduced 2400-point scale, added new writing section")
# Test.create(name: "ACT", version: "2014-06", updates: "Introduced paired passage on reading section")
# Test.create(name: "ACT", version: "2014-10", updates: "Made science section less predictable")

actEnglish = Section.create(name: "English", version: "2015", order: 1, standard_time: (45 * 60), total_questions: 75)
actMath = Section.create(name: "Math", version: "2015", order: 2, standard_time: (60 * 60), total_questions: 60)
actReading = Section.create(name: "Reading", version: "2014-06", order: 3, standard_time: (35 * 60), total_questions: 40)
actScience = Section.create(name: "Science", version: "2014-10", order: 4, standard_time: (35 * 60), total_questions: 40)

satReading = Section.create(name: "Reading", version: "2016", order: 1, standard_time: (65 * 60), total_questions: 52)
satWriting = Section.create(name: "Writing and Language", version: "2016", order: 2, standard_time: (35 * 60), total_questions: 44)
satMathNoCalc = Section.create(name: "Math - No Calculator", version: "2016", order: 3, standard_time: (25 * 60), total_questions: 20)
satMathCalc = Section.create(name: "Math - Calculator", version: "2016", order: 4, standard_time: (55 * 60), total_questions: 38)

TestSection.create(test_id: act.id, section_id: actEnglish.id)
TestSection.create(test_id: act.id, section_id: actMath.id)
TestSection.create(test_id: act.id, section_id: actReading.id)
TestSection.create(test_id: act.id, section_id: actScience.id)

TestSection.create(test_id: sat.id, section_id: satReading.id)
TestSection.create(test_id: sat.id, section_id: satWriting.id)
TestSection.create(test_id: sat.id, section_id: satMathNoCalc.id)
TestSection.create(test_id: sat.id, section_id: satMathCalc.id)

act72c = TestForm.create(code: '72C', admin_date: Date.new(2014, 6, 7), admin_region: 'us', admin_country: 'United States of America', test_id: act.id)

act72cEnglish = SectionForm.create(test_form_id: act72c.id, section_id: actEnglish.id)
act72cMath = SectionForm.create(test_form_id: act72c.id, section_id: actMath.id)
act72cReading = SectionForm.create(test_form_id: act72c.id, section_id: actReading.id)
act72cScience = SectionForm.create(test_form_id: act72c.id, section_id: actScience.id)
