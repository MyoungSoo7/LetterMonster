<<<<<<<< HEAD:Lemon/backend/src/main/generated/com/lemon/backend/domain/characters/entity/QCharacters.java
package com.lemon.backend.domain.characters.entity;
========
package com.lemon.backend.domain.characters.character.entity;
>>>>>>>> 54d74913a972581e97443a911a4cad0096fe7cbc:Lemon/backend/src/main/generated/com/lemon/backend/domain/characters/character/entity/QCharacters.java

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCharacters is a Querydsl query type for Characters
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCharacters extends EntityPathBase<Characters> {

<<<<<<<< HEAD:Lemon/backend/src/main/generated/com/lemon/backend/domain/characters/entity/QCharacters.java
    private static final long serialVersionUID = -1498055719L;
========
    private static final long serialVersionUID = -1603071148L;
>>>>>>>> 54d74913a972581e97443a911a4cad0096fe7cbc:Lemon/backend/src/main/generated/com/lemon/backend/domain/characters/character/entity/QCharacters.java

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCharacters characters = new QCharacters("characters");

    public final com.lemon.backend.domain.base.QBaseEntity _super = new com.lemon.backend.domain.base.QBaseEntity(this);

<<<<<<<< HEAD:Lemon/backend/src/main/generated/com/lemon/backend/domain/characters/entity/QCharacters.java
    public final ListPath<CharacterMotion, QCharacterMotion> characterMotionList = this.<CharacterMotion, QCharacterMotion>createList("characterMotionList", CharacterMotion.class, QCharacterMotion.class, PathInits.DIRECT2);
========
    public final ListPath<com.lemon.backend.domain.characters.characterMotion.entity.CharacterMotion, com.lemon.backend.domain.characters.characterMotion.entity.QCharacterMotion> characterMotionList = this.<com.lemon.backend.domain.characters.characterMotion.entity.CharacterMotion, com.lemon.backend.domain.characters.characterMotion.entity.QCharacterMotion>createList("characterMotionList", com.lemon.backend.domain.characters.characterMotion.entity.CharacterMotion.class, com.lemon.backend.domain.characters.characterMotion.entity.QCharacterMotion.class, PathInits.DIRECT2);
>>>>>>>> 54d74913a972581e97443a911a4cad0096fe7cbc:Lemon/backend/src/main/generated/com/lemon/backend/domain/characters/character/entity/QCharacters.java

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final BooleanPath mainCharacter = createBoolean("mainCharacter");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath nickname = createString("nickname");

    public final com.lemon.backend.domain.users.user.entity.QUsers users;

    public QCharacters(String variable) {
        this(Characters.class, forVariable(variable), INITS);
    }

    public QCharacters(Path<? extends Characters> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCharacters(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCharacters(PathMetadata metadata, PathInits inits) {
        this(Characters.class, metadata, inits);
    }

    public QCharacters(Class<? extends Characters> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.users = inits.isInitialized("users") ? new com.lemon.backend.domain.users.user.entity.QUsers(forProperty("users")) : null;
    }

}

