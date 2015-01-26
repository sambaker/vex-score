(function (global) {

    global.vexInit = function(canvas) {
        var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
        var context = renderer.getContext();
        renderer.resize(500, 500); // Resize and clear canvas
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

        TIME4_4 = {
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        };

        // Create and draw the tablature stave
        var stave = new Vex.Flow.Stave(10, 40, 500);
        stave.setContext(context).draw();
        stave.addClef("bass").setContext(context).draw()

        global.VF = {
            canvas: canvas,
            renderer: renderer,
            context: context,
            stave: stave
        };

        function newNote(note_struct) {
            note_struct.clef = note_struct.clef || stave.clef;
            var note = new Vex.Flow.StaveNote(note_struct);
            note.setStave(stave);
            return note;
        }

        function newAcc(type) {
            return new Vex.Flow.Accidental(type);
        }

        var notes = [
        newNote({
            keys: ["f/4"],
            stem_direction: 1,
            duration: "16"
        }),
        newNote({
            keys: ["f/4"],
            stem_direction: 1,
            duration: "16"
        }),
        newNote({
            keys: ["d/4"],
            stem_direction: 1,
            duration: "16"
        }),
        newNote({
            keys: ["c/4"],
            stem_direction: 1,
            duration: "16"
        }),
        newNote({
            keys: ["c/4"],
            stem_direction: 1,
            duration: "16"
        }),
        newNote({
            keys: ["d/4"],
            stem_direction: 1,
            duration: "16"
        }),
        newNote({
            keys: ["c/4"],
            stem_direction: 1,
            duration: "2"
        }),
        newNote({
            keys: ["c/4"],
            stem_direction: 1,
            duration: "4"
        })];

        var notes2 = [
        newNote({
            keys: ["f/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["e/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["d/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["c/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["c/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["d/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["f/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["e/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["c/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["d/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["f/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["e/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["c/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["d/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["f/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["e/3"],
            stem_direction: -1,
            duration: "16"
        }),
        newNote({
            keys: ["e/3"],
            stem_direction: -1,
            duration: "8"
        })];

        function createNote(note_prop) {
            return new Vex.Flow.GraceNote(note_prop);
        }

        var gracenote_group0 = [{
            keys: ["b/3"],
            duration: "8",
            slash: true
        }];

        var gracenote_group1 = [{
            keys: ["f/3"],
            duration: "8",
            slash: true
        }];

        var gracenote_group2 = [{
            keys: ["f/3"],
            duration: "32",
            stem_direction: -1
        }, {
            keys: ["e/3"],
            duration: "32",
            stem_direction: -1
        }];

        var gracenotes1 = gracenote_group0.map(createNote);
        var gracenotes2 = gracenote_group1.map(createNote);
        var gracenotes3 = gracenote_group2.map(createNote);

        gracenotes2[0].setStemDirection(-1);
        gracenotes2[0].addAccidental(0, new Vex.Flow.Accidental('#'));

        notes[3].addModifier(0, new Vex.Flow.GraceNoteGroup(gracenotes1));
        notes2[1].addModifier(0, new Vex.Flow.GraceNoteGroup(gracenotes2).beamNotes());
        notes2[5].addModifier(0, new Vex.Flow.GraceNoteGroup(gracenotes3).beamNotes());

        var voice = new Vex.Flow.Voice(TIME4_4).setStrict(false);
        var voice2 = new Vex.Flow.Voice(TIME4_4).setStrict(false);
        voice.addTickables(notes);
        voice2.addTickables(notes2);

        var formatter = new Vex.Flow.Formatter().joinVoices([voice, voice2]).formatToStave([voice, voice2], stave);

        var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
        var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8));

        var beam2_1 = new Vex.Flow.Beam(notes2.slice(0, 4));
        var beam2_2 = new Vex.Flow.Beam(notes2.slice(4, 8));
        var beam2_3 = new Vex.Flow.Beam(notes2.slice(8, 12));
        var beam2_4 = new Vex.Flow.Beam(notes2.slice(12, 16));

        voice.draw(context, stave);
        voice2.draw(context, stave);
        beam1_1.setContext(context).draw();
        beam1_2.setContext(context).draw();

        beam2_1.setContext(context).draw();
        beam2_2.setContext(context).draw();
        beam2_3.setContext(context).draw();
        beam2_4.setContext(context).draw();
    }
})(window)
